// const list = document.querySelectorAll(`.list .item`);
// const rotateElement = document.querySelector(`.bg-ratate`);
// let hide = 0;
// let active = 1;
// let rotate = 0;
// let arrcolor = [`#8289BA`,`#F5C069`,`#C47EAA`,`#9989D0`];
// let positionColor = 0;
// const next = document.querySelector(`.menu #next`);
// console.log(next.value);
// next.onclick = function(){
//     positionColor = positionColor+1 >= arrcolor.length ? 0: positionColor +1;
//     active = active + 1 >= list.length ? 0 : active +1 ;
//     hide = active - 1 < 0 ? list.length -1 : active -1;
//     console.log(`hehehehe`);
//     activeItem();
    
// }
// // document.querySelector('.fa-arrow-righ').onclick = function(){
// //     rotate = rotate +100;
// //     positionColor = positionColor+1 >= arrcolor.length ? 0: positionColor +1;
// //     active = active + 1 >= list.length ? 0 : active +1 ;
// //     hide = active - 1 < 0 ? list.length -1 : active -1;
// //     activeItem();
// //     console.log(`hehehehe`);
// // }
// function activeItem(){
//     rotateElement.style.transform = `rotate(`+100+`deg)`;
//     rotateElement.style.backgroundColor = arrcolor[positionColor];
//     let remove_hide_active = hide -1 < 0 ? list.length -1 :hide -1;
//     list[remove_hide_active].classList.remove(`hide`);
//     list[remove_hide_active].classList.remove(`active`);

//     list[hide].classList.add(`hide`);
//     list[hide].classList.add(`active`);
// }

const