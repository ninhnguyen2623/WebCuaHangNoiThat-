

// silder trong phần header
document.getElementById(`next`).onclick = function(){
    let list = document.querySelectorAll(`.item`);
    document.getElementById(`slider`).appendChild(list[0]);
}
document.getElementById(`prev`).onclick = function(){
    let list = document.querySelectorAll(`.item`);
    document.getElementById(`slider`).prepend(list[list.length -1]);
}
// -------------------------------------------------------------------------------------------
// --------------------------------------------login------------------------------------------
// kiểm tra điều kiện khi đăng nhập 
const username = document.querySelector(`#username`);
const email = document.querySelector(`#email`);
const password = document.querySelector(`#password`);
const password2 = document.querySelector(`#password2`);
const form = document.querySelector(`#form`);

function checkerror(input,messger){
    const parent = input.parentElement;
    const errorInput = parent.querySelector(`.error`);
	parent.className = 'form-control error';
    errorInput.innerText=messger;

}
function success(input){
    const parent = input.parentElement;
    const small = parent.querySelector(`.error`);
	parent.className = 'form-control success';
    small.innerText=``;
}

function inputElement(){
    const nameValue = username.value.trim();
    const emailValue = email.value.trim();
    if(nameValue === ''){
        checkerror(username,`vui long nhap ten`);
    }
    else{
        success(username);
    }

    if(emailValue === ''){
        checkerror(email,`vui long nhap email vao`);
    }
    else if(!isEmail(emailValue)){
        checkerror(email,`email cua ban khong hop le`);
    }
    else{
        success(email);
    }
}
function inputPassword(){
    const passwordValue = password.value.trim();
    const password2Vale = password2.value.trim();    
    if(passwordValue === ''){
        checkerror(password,`vui long nhap mat khau`)
    }
    else {
        success(password);
    }
    if(password2Vale === ''){
        checkerror(password2,`vui long nhap lai mat khau`);
    }else if(passwordValue != password2Vale){
        checkerror(password2,`mat khau khong chung khop`);
    }
    else{
        success(password2);
    }
}

form.addEventListener(`submit`, e =>{
    e.preventDefault();
    inputElement();
    inputPassword();
});
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
// click user login
const clickUser = document.querySelector(`#user_login`);
clickUser.onclick = function(){
    const loginElement = document.querySelector(`.modal`);
    return loginElement.style.display=`block`;
}
const closeElement = document.querySelector(`#close_login`);
closeElement.onclick = function(){
    const loginElement = document.querySelector(`.modal`);
    return loginElement.style.display=`none`;
}
// -------------------------------------------------------------------------------------------
// thêm giỏ hàng card-information--------------------------------------------------------------
const cardInformation = document.querySelector(`#btnCard i`);
    cardInformation.addEventListener(`click`, function(e){
        let btnItem = e.target;
        let product = btnItem.parentElement.parentElement;
        let productPR = product.parentElement;
        let productImgItem = productPR.querySelectorAll(`.img .card-item`);
        let productImg;
        // kiểm tra img được chọn và lấy ra link hình ảnh
        productImgItem.forEach(item => {
            let img = item.querySelector(`input`);
            if(img.checked == true) {
                productImg = img.parentElement.querySelector(`img`).src;
            }
        })
        let productName = productPR.querySelector(`.title .name`).innerText;
        let productSize1 = product.querySelectorAll(`#label-card`);
        let productSize = 39 ;
        // kiểm tra size đang được chọn và lấy ra size
        productSize1.forEach(item =>{
            let size = item.querySelector(`input`);
            if(size.checked === true) {
                productSize = item.innerText;
            }  
        });
        let productPrice1 = productPR.parentElement.querySelector(`.mores .price`).innerText;
        // kiểm tra điều kiện giỏ hàng đã có sản phẩm hay chưa
        if(checkcard(productImg,productName,productSize)===false){
            alert(productName+` đã được thêm vào giỏ hàng`);
            addCard2(productImg,productName,productSize,productPrice1);
        }else {
                alert(`sản phẩm đã có trong giỏ hàng vui lòng chọn sản phẩm khác hoặc chọn kích thước khác !`)
        }
        // tính tổng 
        sumcardshopitem();
        // xóa sản phẩm
        removeCardItem();
       
})
// push thêm một sản phẩm vào trong giỏ hàng của card
function addCard2(productImg,productName,productSize,productPrice1){
    let addivCard = document.createElement(`div`);
     addivCard.classList.add(`modal-list-card-body-thead-tbody`);

    let divContent = `
    <div class="modal-list-card-body-thead-tbody-img">
        <img src="`+productImg+`" alt="">
        <p>`+productName+`</p>
    </div>
    <p id="checksize">`+productSize+`</p>
    <p><span>`+productPrice1+`</span></p>
    <input type="number" value="1" min="1" >
    <button id="removeCard" value="">Xóa</button>
    `;
    addivCard.innerHTML = divContent;
    let cardTable = document.querySelector(`.modal-list-card-body .box-card`);
    cardTable.append(addivCard);
    const sumProduct = document.querySelector(`.sum-product #sum-product-card`);
    sumProduct.innerHTML = cardtotal().toLocaleString(`de-DE`);
}
// -------------------------------------------------------------------------------------------
// them vao gio hang list card-------------------------------------------------------------------------------------------
const btn = document.querySelectorAll(`.add-card`);
btn.forEach(function(button,index){
    button.addEventListener(`click`, function(event){
        let btnItem = event.target;
        let product = btnItem.parentElement;
        // kiểm tra size đang được chọn và lấy ra size
        let prSize = product.querySelectorAll(`.list-card-item-content-size > label`);
        let productSize = 39;
         prSize.forEach(item => {
             let size = item.querySelector(`#check-size`);
             if(size.checked === true) {
                productSize = item.innerText;
             }
         })
         let productImg = product.parentElement.querySelector(`.img-shop-item`).src;
         let productName = product.querySelector(`.list-card-item-content-title`).innerText;
         let productprice = product.querySelector(`.list-card-item-content-price`).innerText;
         let productSL = product.querySelector(`.cout`).value;
        // kiểm tra điều kiện giỏ hàng đã có sản phẩm hay chưa
         if(checkcard(productImg,productName,productSize)===false){
             alert(productName+` đã được thêm vào giỏ hàng`);
            addCard(productImg,productName,productSize,productprice,productSL);
        }
         else {
            alert(`sản phẩm đã có trong giỏ hàng vui lòng chọn sản phẩm khác hoặc chọn kích thước khác !`)
         }
        //   tính tổng trong giỏ hàng
         sumcardshopitem();
        //  xóa sản phẩm
         removeCardItem();
    })
})
// push thêm một sản phẩm vào trong giỏ hàng
function addCard(productImg,productName,productSize,productprice,productSL) {
    let addivCard = document.createElement(`div`);
    addivCard.classList.add(`modal-list-card-body-thead-tbody`);
    let divContent = `
    <div class="modal-list-card-body-thead-tbody-img">
        <img src="`+productImg+`" alt="">
        <p>`+productName+`</p>
    </div>
    <p id="checksize">`+productSize+`</p>
    <p><span>`+productprice+`</span></p>
    <input type="number" value="`+productSL+`" min="1" >
    <button id="removeCard" value="">Xóa</button>
    `;
    addivCard.innerHTML = divContent;
    let cardTable = document.querySelector(`.modal-list-card-body .box-card`);
    cardTable.append(addivCard);
    const sumProduct = document.querySelector(`.sum-product #sum-product-card`);
    sumProduct.innerHTML = cardtotal().toLocaleString(`de-DE`);
}
//tinh tong trong giỏ hàng
function cardtotal() {
    let total = 0;
    let cartItem = document.querySelectorAll(`.modal-list-card-body .modal-list-card-body-thead-tbody`);
    cartItem.forEach(item => {
        let inputvalue = item.querySelector(`input`).value;
        let price = item.querySelector(`span`).innerHTML;
        price = parseFloat(price)*1000*1000;
        totalSum = parseInt(inputvalue*price);
        total = total + totalSum ;
    })
    return total;
}
// tính tong trong gio hang  khi cập nhật lại số lượng sản phẩm trong giỏ hàng
function sumcardshopitem(){
    const cardtotalSum = document.querySelectorAll(`.modal-list-card-body .modal-list-card-body-thead-tbody input`);
    cardtotalSum.forEach(item =>{
        item.addEventListener(`click`,function(e){
             const sumProduct = document.querySelector(`.sum-product #sum-product-card`);
             sumProduct.innerHTML = cardtotal().toLocaleString(`de-DE`);
        })
    })
}
// kiểm tra sản phẩm đã có trong gio hang chưa nếu có không cho thêm nữa
function  checkcard(productImg,productName,productSize){
    let cartItem2 = document.querySelectorAll(`.modal-list-card-body .modal-list-card-body-thead-tbody`);
    let check = false;
    cartItem2.forEach(item => {
        let name = item.querySelector(`.modal-list-card-body-thead-tbody-img p`).innerText;
        let size = item.querySelector(`#checksize`).innerText;
        let img = item.querySelector(`.modal-list-card-body-thead-tbody-img img`).src;
        // kiểm tra sản phẩm có bị trùng không
        if(productName === name  && parseInt(productSize) === parseInt(size) && productImg === img) {
            check = true;
        }
    })
    return check;
}
// xóa sẳn phẩm trong giỏ hàng
function removeCardItem(){
    const removeItem = document.querySelectorAll(`#removeCard`);
    removeItem.forEach(item =>{
        item.addEventListener(`click`,function(){
          let removeCard = item.parentElement;
           removeCard.remove();
           // cập nhật lại tổng tiền giỏ hàng
           const sumProduct = document.querySelector(`.sum-product #sum-product-card`);
           sumProduct.innerHTML = cardtotal().toLocaleString(`de-DE`);
        })
    })
};
//bắt sự kiện khi click giỏ hàng cho hiện lên
const clickCard = document.querySelector(`#user_card`)
clickCard.onclick = function(){
    const loginElement = document.querySelector(`.modal-list-card`);
    return loginElement.style.display=`block`;
}
const closeCard = document.querySelector(`#close-card`);
closeCard.onclick = function(){
    const loginElement = document.querySelector(`.modal-list-card`);
    return loginElement.style.display=`none`;
}

// -------------------------------------------------------------------------------------------
// hiện thông tin thanh toán------------------------------------------------------------------
const checkpaypao = document.querySelectorAll(`.modal-list-card-body-info-paypao label`);
checkpaypao.forEach(item =>{
    let checkeye = item.parentElement.parentElement;
     item.addEventListener(`click`,function(){
        if(item.innerText===`InternetBanking`){
            let checkeyeInternetBanking = checkeye.querySelector(`#form-internetbanking`);
            checkeyeInternetBanking.style.display=`block`;
        }
        if(item.innerText===`COD`){
            let checkeyeInternetBanking2 = checkeye.querySelector(`#form-internetbanking`);
            checkeyeInternetBanking2.style.display=`none`;
        }
     })
})
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// check thông tin khach hàng-----------------------------------------------------------------
const usernameKH = document.querySelector(`#modal-list-card-body-info-fullname`);
const phoneSDT = document.querySelector(`#modal-list-card-body-info-sdt`);
const addressDC = document.querySelector(`#modal-list-card-body-info-address`);
const emailKH = document.querySelector(`#modal-list-card-body-info-email`);
const conttentKH = document.querySelector(`#modal-list-card-body-info-contteent-nd`);
const form_2 = document.querySelector(`#form_information_KH`);
function checkerror_2(input,messger){
    const parent = input.parentElement;
    const errorInput = parent.querySelector(`.error_2`);
    errorInput.innerText=messger;

}

function success_2(input){
    const parent = input.parentElement;
    const small = parent.querySelector(`.error_2`);
    small.innerText=``;
}
function inputElement_2(){
    const nameValue = usernameKH.value.trim();
    const emailValue = emailKH.value.trim();
    const Address = addressDC.value.trim();
    const sdtkh = phoneSDT.value.trim();
    if(nameValue === ''){
        checkerror_2(usernameKH,`vui lòng nhập tên`);
    }
    else{
        success_2(usernameKH);
    }

    if(emailValue === ''){
        checkerror_2(emailKH,`vui lòng nhập email vào`);
    }
    else if(!isEmail(emailValue)){
        checkerror_2(emailKH,`email của bạn không hợp lệ`);
    }
    else{
        success_2(emailKH);
    }
    if(Address === ''){
        checkerror_2(addressDC,'vui lòng nhập địa chỉ');
    }
    else {
        success_2(addressDC);
    }
    if(sdtkh === ''){
        checkerror_2(phoneSDT,`vui lòng nhập số điện thoại`)
    }
    else if (is_phonenumber(sdtkh)===false){
        checkerror_2(phoneSDT,`số điện thoại của bạn không đúng định dạng`)
    }
    else {
        success_2(phoneSDT);
    }
}
form_2.addEventListener(`click`, e =>{
  
    e.preventDefault();
    inputElement_2();
});

function is_phonenumber(phonenumber) {
  var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if(phonenumber.match(phoneno)) {
    return true;
  }  
  else {  
    return false;
  }
}
// -------------------------------------------------------------------------------------------
// kiểm tra thông tin khách hàng và thông tin thanh toán trước khi đặt hàng-------------------------------------------------------------------------------------------
const clientName = document.querySelector(`.client-name`);
const clientPhone = document.querySelector(`.client-phone`);
const clientAddress = document.querySelector(`.client-address`);
const sumcardvalue = document.querySelector(`.moda-order-body-information-sum-order`);
const sumProduct_2 = document.querySelector(`.sum-product #sum-product-card`);
const clickShip = document.querySelector(`#click-ship`);
clickShip.addEventListener(`click`,function(e){
      const nameValue = usernameKH.value.trim();
      const Address = addressDC.value.trim();
      const sdtkh = phoneSDT.value.trim();
      const emailValue = emailKH.value.trim();
      if(nameValue=== '' || Address === '' || sdtkh === '' || emailValue === ''){
        alert(`vui lòng nhập thông tin khách hàng trước khi đặt hàng !`);
      } 
      else if(check_paypao() === true){
        alert(`vui lòng nhập thông tin thanh toán !`);
      }
      else if(checkSP()===false){
        alert(`vui lòng thêm sản phẩm vào`)
      }
      else {
        // const checkBoxcard = document.querySelector(`.box-card`);
        // console.log(checkBoxcard.innerHTML.length);
        const cardElement = document.querySelector(`.modal-list-card`);
        cardElement.style.display=`none`;
        const oderElement = document.querySelector(`.moda-order`);
        oderElement.style.display=`block`;
        // đổ thông tin khách hàng sau khi đã được check vào trong hóa đơn
        clientName.innerText = nameValue;
        clientPhone.innerText = sdtkh;
        clientAddress.innerText = Address;
        sumcardvalue.innerText = sumProduct_2.innerText;
        paypaoValue();
        removeCardItem_2();
      } 
      


})
// ham lấy value thông tin thanh toán đổ vào hóa đơn
function paypaoValue(){
    const checkpaypao_2 = document.querySelectorAll(`.modal-list-card-body-info-paypao label`);
    checkpaypao_2.forEach(item =>{
    let payElement = document.querySelector(`.moda-order-body-information-CODbanking`);
    let input_element = item.querySelector(`input`);
    if(input_element.checked==true)
    {
      payElement.innerText = item.innerText;
    }
})
}
// check input thanh toán đã được điền chưa
function check_paypao(){
        let check;
        const checkpaypao_2 = document.querySelectorAll(`.modal-list-card-body-info-paypao label`);
        checkpaypao_2.forEach(item =>{
            let input_element = item.querySelector(`input`);
            if(input_element.checked == true)
            {
                let parent_element = input_element.parentElement;
                if(parent_element.innerText.length===`InternetBanking`.length)
                {
                   let parentInput = parent_element.parentElement.parentElement;
                   let checkInputElement = parentInput.querySelectorAll(`#form-internetbanking input`);
                   checkInputElement.forEach(e => {
                        if(e.value===''){
                            check=true;
                        }
                   })
                }  
                else {
                    check = false;
                }      
            }
        })
        return check;
}
// check giỏ hàng đẫ có sản phẩm chưa
function checkSP(){
    let check;
    const checkBoxcard = document.querySelector(`.box-card`);
    if(checkBoxcard.innerHTML.length > 549 ){
        check = true;
    }
    else {
        check = false;
    }
    return check;
}
// xóa sản phẩm sau khi xuất hóa đơn 
function removeCardItem_2(){
    const removeItem = document.querySelectorAll(`.modal-list-card-body-thead-tbody`);
    removeItem.forEach(item =>{
          item.remove();
          const sumProduct = document.querySelector(`.sum-product #sum-product-card`);
          sumProduct.innerHTML = cardtotal().toLocaleString(`de-DE`);
    })
};
// click tiếp tục mua sắp
const clickContinueshopping = document.querySelector(`.moda-order-body-information-end a`);
clickContinueshopping.addEventListener(`click`,function(){
    const oderElement = document.querySelector(`.moda-order`);
        oderElement.style.display=`none`;
})