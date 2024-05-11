const operatorReg = /^(\+|-|\×|\÷)$/; //四則演算の正規表現　(\はエスケープ文字)
const numReg = /^([0-9]|00)$/;        //数字の正規表現
const numReg00 = /^([0-9]|\.)$/;
let canAddDecimalPoint = true; //小数点が追加できるか否か


function clickNumber(btn) {
    const preValue = document.dentaku.display.value.slice(-1); //前回クリックしたボタン
    let value = btn.value;
    let allDisplay = document.dentaku.display.value;

    //もし小数点がクリックされたとき、
    if (value ==".") {
        if (canAddDecimalPoint === false) return; //小数点が追加できないと判断されたら、何もしない。
        if (preValue === "" || preValue === "." || operatorReg.test(preValue)) {  //入力無しの場合、一個前に小数点が入力されている場合、一個前に四則演算が入力されている場合のいずれか(||)に該当した場合
            return; //何もしない。
        }
        canAddDecimalPoint = false; //小数点が追加できない
    }else if (numReg.test(value) === false) {  //数字以外が入力された場合、
        canAddDecimalPoint = true;  //小数点が追加できる
    }
    

    //もし四則演算がクリックされて、且つ(&&)ひとつ前に既に四則演算がクリックされている場合、
    if (operatorReg.test(value) && operatorReg.test(preValue)) {
        return; //何もしない。
    }
 

    //質問部分　allDisplayが反応していないのはなぜか。
    //もし、0をクリックしたとき、
    if (value =="0"||"00") {
        if (allDisplay =="0") { //0のみの状態の場合なら
            return; //何もしない。
        }

    

    
    if(value == "=") {
        document.dentaku.display.value = eval(document.dentaku.display.value);
    } else if(btn.value == "AC") {
        document.dentaku.display.value = "";
    } else {
        if(value == "×") {
            btn.value = "*";

        } else if(btn.value == "÷") {
            btn.value = "/";


        //もし00がクリックされたとき、前回クリックしたボタンが(数値または小数点)ではない場合、
        } else if(btn.value == "00"&& /^([0-9]|\.)$/.test(preValue) === false) {
            btn.value = "0" //0とする。
        }

        document.dentaku.display.value += btn.value;
        document.dentaku.multi_btn.value = "×";
        document.dentaku.div_btn.value = "÷";
        document.dentaku.zerozero_btn.value = "00";
    }
}
}
