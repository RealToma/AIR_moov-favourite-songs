import mongo from '/lib/mongo'
import { 
    MDL_SCHEMA,
    PRODUCT_SCHEMA,
    ARTIST_SCHEMA,
    USER_SCHEMA,
 } from '/lib/schema/mdl'
import map from 'lodash/map'
import get from 'lodash/get'
import find from 'lodash/find'
import filter from 'lodash/filter'
import compact from 'lodash/compact'

// mdl indication

// mdl_1.csv	song	1a. Most listened to song(s) in the past year (你最沉醉嘅歌係), Number of times listened
// mdl_2_1_all.csv	artist	2a. Most listened to artist(s) in the past year (你最力撐嘅歌手係), Number of times listened to artist’s songs
// mdl_2_1_local.csv	artist	2c1. Most listened to artist(s) in the past year (你最力撐嘅歌手係), Number of times listened to artist’s songs, Top 3 local
// mdl_2_1_nonlocal.csv	artist	2c2. Most listened to artist(s) in the past year (你最力撐嘅歌手係), Number of times listened to artist’s songs, Top 3 other
// mdl_2_2.csv	song	2b. Most listened to artist(s) in the past year (你最力撐嘅歌手係), Most listened to song from artist
// mdl_3.csv	playlist	3. Most listened to playlist in the past year (editorial playlists)
// mdl_4_1.csv	song	4a. Most listened to song on special date in 2022 (show 1), Valentine’s Day (Feb 14)
// mdl_4_2.csv	song	4b. Most listened to song on special date in 2022 (show 1), Mid-Autumn Festival (Sep 10)
// mdl_5.csv	song	5. Forgotten song (biggest drop in # of plays by user compared to ‘21 [min. 1 play in ‘22])
// mdl_6.csv	song	6. First song listened to in 2022
// mdl_7.csv	total time	7. Total time listened in 2022 (before data collection)
// detail_artist.csv	artist meta	Artist detail mapping table (for mdl_2_1_all, mdl_2_1_local, mdl_2_1_nonlocal use ONLY)
// detail_product.csv	song meta	Product detail mapping table (for other tables use)

const MDLs = [
    {
        key: 'mdl_2_1_all',
        name: '你最力撐嘅歌手係',
        type: 'artist',
    },
    {
        key: 'mdl_2_2',
        name: '你最力撐嘅歌手係',
        type: 'song',
    },
    {
        key: 'mdl_1',
        name: '你最沉醉嘅歌係',
        type: 'song',
    },    
    {
        key: 'mdl_2_1_local',
        name: '你最力撐嘅歌手係',
        type: 'artist',
    },
    {
        key: 'mdl_2_1_nonlocal',
        name: '你最力撐嘅歌手係',
        type: 'artist',
    },
    {
        key: 'mdl_3',
        name: 'Most listened to playlist in the past year (editorial playlists)',
        type: 'playlist',
    },
    {
        key: 'mdl_4_1',
        name: 'Most listened to song on special date in 2022 (show 1), Valentine’s Day (Feb 14)',
        type: 'song',
    },
    {
        key: 'mdl_4_2',
        name: 'Most listened to song on special date in 2022 (show 1), Mid-Autumn Festival (Sep 10)',
        type: 'song',
    },
    {
        key: 'mdl_5',
        name: ' Forgotten song (biggest drop in # of plays by user compared to ‘21 [min. 1 play in ‘22])',
        type: 'song',
    },
    {
        key: 'mdl_6',
        name: 'First song listened to in 2022',
        type: 'song',
    },
    {
        key: 'mdl_7',
        name: 'Total time listened in 2022 (before data collection)',
        type: 'total',
    },
]


const fetchList = async (user_id) => {
    const conn = await mongo.connect()
    const filters = {
        user_id,
    }
    let productIds = []
    let contributorIds = []

    const productModel = await conn.models['mdl_detail_product'] || conn.model('mdl_detail_product', PRODUCT_SCHEMA, 'mdl_detail_product')
    const artistModel = await conn.models['mdl_detail_artist'] || conn.model('mdl_detail_artist', ARTIST_SCHEMA, 'mdl_detail_artist')

    const list = await Promise.all(
        map(MDLs, async (mdl) => {
            const mdlModel = conn.models[mdl.key] || conn.model(mdl.key, MDL_SCHEMA, mdl.key)
            const mdlData = await mdlModel.findOne(
                filters,
            )

            // prepare for bulk get
            if (get(mdlData, 'productid')) productIds.push(mdlData.productid)

            // prepare for bulk get
            if (get(mdlData, 'contributorid')) contributorIds.push(mdlData.contributorid)

            // prepare for bulk get
            if (get(mdlData, 'contributors', []).length)
                contributorIds = [
                    ...contributorIds,
                    ...map(mdlData.contributors, (contributor) => contributor.contributorid)
                ]

            return {
                ...mdl,
                mdlData,
            }
        })
    )

    const filteredList = filter(list, (item) => get(item, 'mdlData'))

    // bulk get products
    const products = productIds.length ? await productModel.find({
        productid: {
            $in: productIds,
        },
    }) : []

    // bulk get artists
    const artists = contributorIds.length ? await artistModel.find({
        contributorid: {
            $in: contributorIds,
        },
    }) : []

    // refactor start

    const refactorList = map(
        filteredList,
        (item) => {
            if (item?.mdlData?.productid) {
                const product = find(products, { productid: item.mdlData.productid })
                item.product = product || null
                item.refactorData = product ? {
                    fk: product.productid,
                    label: product.product_title,
                    image: product.product_image,
                    num: item.mdlData.product_num,
                } : null
            }
            if (item?.mdlData?.contributorid) {
                const artist = find(artists, { contributorid: item.mdlData.contributorid })
                item.artist = artist || null
                item.refactorData = artist ? {
                    fk: artist.contributorid,
                    label: artist.artist_name,
                    image: artist.artist_image,
                    num: item.mdlData.product_num,
                } : null
            }
            if (get(item, 'mdlData.contributors', []).length) {
                // filter out unexists contributor
                const contributors = compact(map(item.mdlData.contributors, (contributor) => find(artists, (artist) => artist.contributorid === contributor.contributorid)))
                item.artists = contributors
                item.refactorData = map(contributors, (artist) => {
                    return {
                        fk: artist.contributorid,
                        label: artist.artist_name,
                        image: artist.artist_image,
                        num: find(item.mdlData.contributors, { contributorid: artist.contributorid})?.product_num || 0,
                    }
                })
            }
        return item
    })
    // refactor end

    return {
        list: refactorList,
        products,
        artists,
    }
}

const checkUser = async (user_id) => {
    const conn = await mongo.connect()
    const filters = {
        user_id,
    }

    const userModel = await conn.models['mdl_valid_audio_users'] || conn.model('mdl_valid_audio_users', USER_SCHEMA, 'mdl_valid_audio_users')
    const userData = await userModel.findOne(
        filters,
    )

    if (userData) {
        return userData
    } else {
        return false
    }
}

module.exports = {
    fetchList,
    checkUser,
}