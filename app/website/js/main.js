gsap.registerPlugin(ScrollToPlugin);

const ticket = document.getElementById("ticket");
const nextIcon = document.getElementById("nextIcon");
const resultPage = document.querySelectorAll("#resultPage");
const have_2nd_result = ["none","no","yes","yes","yes"];
let page_num = 0;

//document.addEventListener("wheel", handleWheel);
//document.addEventListener("touchmove", handleTouchMove);

function ticket_moving(){
  gsap.to(".ticket", {
      rotate:1,
      duration: .5,
      yoyo:true,
      repeat:-1,
      repeatDelay:0
    });
  gsap.to(".index_cloud", {
    xPercent:-320,
    duration:40
  })
    // return () => {
    // }
}
ticket_moving();


function index_dismiss(){
  let tl = new TimelineMax({
    onStart: function(){ 
      //gsap.set('.scene01_near', {x: 100, opacity: 0.5});
      console.log('play') 
    },
    onComplete: function(){ 
      //scene1_anime()
      page_num = 1
      console.log('page : '+page_num)
      gsap.set(".index_page", {zIndex:0});
      //let indexPage = document.querySelectorAll(".index_page")
      //indexPage.style.left = 500+'px';
      result_in()
    },
  });
  tl.to('.index_page', {
      autoAlpha:0,
      duration: 1
    })
    .to('.scene01_tree', {
      x:-600,
      duration: .8,
      repeat:3
    },0)
    .from('.scene01_far', {
      xPercent:50,
      duration: 6
    },0)
    .from('.scene01_mid', {
      xPercent:80,
      duration: 6
    },0)
    .from('.scene01_near', {
      xPercent:100,
      duration: 6
    },0);
    //return tl;
}
ticket.addEventListener("click", index_dismiss);

function mochi_anime(){
  //var steppedEase = new steppedEase(5);
  gsap.to(".carriage_mochi img", {
    duration: 3,
    x:-320, 
    ease:"steps(2)",
    yoyo:true,
    repeat: -1
  });
  
}
mochi_anime()

function anime_S2(){
  let tl = new TimelineMax({
    onStart: function(){ 
      gsap.to('#resultPage',{left:-500})
    },
    onComplete: function(){ 
      //scene1_anime()
      page_num = 2
      console.log('page : '+page_num)
      gsap.set('#resultPage',{left:500, x:0})
      gsap.set(".result", {display:"none"});
      gsap.set(".mochi",{autoAlpha:0,yPercent:50,})
      gsap.set(".footer_icon",{autoAlpha:0,yPercent:10,})
      result_in()
    },
  });
  tl
    .to('.scene02_tree', {
      x:-600,
      duration: .8,
      repeat:3
    },0)
    .from('.scene02_far', {
      xPercent:50,
      duration: 6
    },0)
    .from('.scene02_mid', {
      xPercent:80,
      duration: 6
    },0)
    .from('.scene02_near', {
      xPercent:100,
      duration: 6
    },0);
    //return tl;
}
function anime_S3(){
  let tl = new TimelineMax({
    onStart: function(){ 
      gsap.to('#resultPage',{left:-500})
    },
    onComplete: function(){ 
      //scene1_anime()
      page_num = 3
      console.log('page : '+page_num)
      gsap.set('#resultPage',{left:500, x:0})
      gsap.set(".result", {display:"none"});
      gsap.set(".mochi",{autoAlpha:0,yPercent:50,})
      gsap.set(".footer_icon",{autoAlpha:0,yPercent:10,})
      result_in()
    },
  });
  tl
    .to('.scene03_tree', {
      x:-600,
      duration: .8,
      repeat:3
    },0)
    .from('.scene03_far', {
      xPercent:50,
      duration: 6
    },0)
    .from('.scene03_mid', {
      xPercent:80,
      duration: 6
    },0)
    .from('.scene03_near', {
      xPercent:100,
      duration: 6
    },0);
    //return tl;
}
function anime_S4(){
  let tl = new TimelineMax({
    onStart: function(){ 
      gsap.to('#resultPage',{left:-500})
    },
    onComplete: function(){ 
      //scene1_anime()
      page_num = 4
      console.log('page : '+page_num)
      gsap.set('#resultPage',{left:500, x:0})
      gsap.set(".result", {display:"none"});
      gsap.set(".mochi",{autoAlpha:0,yPercent:50,})
      gsap.set(".footer_icon",{autoAlpha:0,yPercent:10,})
      result_in()
    },
  });
  tl
    .to('.scene04_tree', {
      x:-600,
      duration: .8,
      repeat:3
    },0)
    .from('.scene04_far', {
      xPercent:50,
      duration: 6
    },0)
    .from('.scene04_mid', {
      xPercent:80,
      duration: 6
    },0)
    .from('.scene04_near', {
      xPercent:100,
      duration: 6
    },0);
    //return tl;
}
function anime_S5(){
  let tl = new TimelineMax({
    onStart: function(){ 
      gsap.to('#resultPage',{left:-500})
      gsap.set('.carriage',{display:"none"})
      gsap.set('.carriage_final',{display:"block"})
    },
    onComplete: function(){ 
      //scene1_anime()
      page_num = 5
      console.log('page : '+page_num)
      gsap.set('#resultPage',{left:500, x:0})
      gsap.set(".result", {display:"none"});
      //result_in()
      show_result5()
    },
  });
  tl
    .to('.scene05_tree', {
      x:-600,
      duration: .8,
      repeat:3
    },0)
    .from('.scene05_far', {
      xPercent:40,
      duration: 6
    },0)
    .from('.scene05_mid', {
      xPercent:50,
      duration: 6
    },0)
    .from('.scene05_near', {
      xPercent:90,
      duration: 6
    },0);
    //return tl;
}

function play_anime(){
  switch(page_num) {
    case 1:
      anime_S2()
      break;
    case 2:
      anime_S3()
      break;
    case 3:
      anime_S4()
      break;
    case 4:
      anime_S5()
      break;
    default:
      //code
  }
}

// CHECK IS THE RESULT HAVE 2nd PAGE
function more_data(){
  console.log(have_2nd_result[page_num]);
  if(have_2nd_result[page_num] == "no"){
    play_anime()
  } else {
    //console.log("go to page 2")
    let target1 = ".result_0"+page_num
    let target2 = ".result_0"+page_num+"b"
    gsap.to(target1, {autoAlpha:0})
    gsap.to(target2, {display:"flex"})
    gsap.set(target1, {display:"none"})

    gsap.to(target2+" div", {
      stagger:.5,
      autoAlpha:1,
      duration: 1
    })
    have_2nd_result[page_num] = "no"
    console.log("changed to "+have_2nd_result[page_num])
  }
}
nextIcon.addEventListener("click", more_data);

function result_in(){
  let tl = new TimelineMax({
    onStart: function(){
       //resultPage.style.left = 500+'px';
       gsap.set("#resultPage", {left:500});
    },
    onComplete: function(){ 
      switch(page_num) {
        case 1:
          // show result 1
          gsap.set(".result_01", {display:"flex"});
          show_result1()
          break;
        case 2:
          // show result 2
          gsap.set(".result_02", {display:"flex"});
          show_result2()
          break;
        case 3:
          // show result 3
          gsap.set(".result_03", {display:"flex"});
          show_result3()
          break;
        case 4:
          // show result 4
          gsap.set(".result_04", {display:"flex"});
          show_result4()
          break;
        case 5:
          // show result final
          gsap.set(".last_result", {display:"flex"});
          show_result5()
          break;
        default:
          // code block
      }
    },
  });
  tl.to(".result_wrapper", {
    x:-500,
    duration: .5
  });
}
function show_result1(){
  let tl = new TimelineMax({
    onStart: function(){
      //let result01 = document.querySelectorAll(".result_01");
      //result01.style.display = "flex";
    },
    onComplete: function(){
      gsap.set(".scene01", {display:"none"});
    },
  });
  tl.to(".result_01 div", {
    stagger:.5,
    autoAlpha:1,
    duration: 1
  })
  .to(".mochi", {
    autoAlpha:1,
    yPercent:-50,
    duration: .8
  })
  .to(".footer_icon", {
    autoAlpha:1,
    yPercent:-10,
    duration: .8
  });
}
function show_result2(){
  let tl = new TimelineMax({
    onStart: function(){
      //let result02 = document.querySelectorAll(".result_02");
      //result02.style.display = "flex";
    },
    onComplete: function(){
      gsap.set(".scene02", {display:"none"});
    },
  });
  tl.to(".result_02 div", {
    stagger:.5,
    autoAlpha:1,
    duration: 1
  })
  .to(".mochi", {
    autoAlpha:1,
    yPercent:-50,
    duration: .8
  })
  .to(".footer_icon", {
    autoAlpha:1,
    yPercent:-10,
    duration: .8
  });
}
function show_result3(){
  let tl = new TimelineMax({
    onStart: function(){
    },
    onComplete: function(){
      gsap.set(".scene03", {display:"none"});
    },
  });
  tl.to(".result_03 div", {
    stagger:.5,
    autoAlpha:1,
    duration: 1
  })
  .to(".mochi", {
    autoAlpha:1,
    yPercent:-50,
    duration: .8
  })
  .to(".footer_icon", {
    autoAlpha:1,
    yPercent:-10,
    duration: .8
  });
}
function show_result4(){
  let tl = new TimelineMax({
    onStart: function(){
    },
    onComplete: function(){
      gsap.set(".scene04", {display:"none"});
    },
  });
  tl.to(".result_04 div", {
    stagger:.5,
    autoAlpha:1,
    duration: 1
  })
  .to(".mochi", {
    autoAlpha:1,
    yPercent:-50,
    duration: .8
  })
  .to(".footer_icon", {
    autoAlpha:1,
    yPercent:-10,
    duration: .8
  });
}

//FINAL RESULT
function auto_scroll(){
  show_result5()
  //gsap.to(".last_result", {duration: 5, scrollTo: -250});
  gsap.to(".result_frame", {duration: 20, scrollTo: 250}, 2);
}
//auto_scroll()

function handleWheel(e) {
  /* if (!listening) return;
  const currentTime = new Date().getTime();

  if (currentTime - lastTime < animationDuration){
    e.preventDefault();
    return;
  }
  direction = e.wheelDeltaY < 0 ? "down" : "up"; */

  console.log("wheel")
}

function show_result5(){
  let tl = new TimelineMax({
    onStart: function(){
    },
    onComplete: function(){
      //gsap.set(".scene04", {display:"none"});
    },
  });
  tl.to(".last_result div", {
    stagger:.5,
    autoAlpha:1,
    duration: 1
  })
}


