const operatorReg = /^(\+|-|\*|\/|\÷|\×)$/; //四則演算の正規表現　(\はエスケープ文字)
const numReg = /^([0-9]|00)$/;        //数字の正規表現
const numReg00 = /^([0-9]|\.)$/;
let canAddDecimalPoint = true; //小数点が追加できるか否か


function clickNumber(btn) {
    let preValue = document.dentaku.display.value.slice(-1); //前回クリックしたボタン
    const preValuetwo = document.dentaku.display.value.slice(-2);
    let value = btn.value;
    let allDisplay = document.dentaku.display.value;

    //もし小数点がクリックされたとき、
    if (value ==".") {
        if (canAddDecimalPoint === false) return; //小数点が追加できないと判断されたら、何もしない。
        if (preValue === "" || preValue === "." || operatorReg.test(preValue)) {  //入力無しの場合、一個前に小数点が入力されている場合、一個前に四則演算が入力されている場合のいずれか(||)に該当した場合
            return; //何もしない。
        }
        canAddDecimalPoint = false; //小数点が追加できない
    }else if (numReg.test(value) === false) {  //数字以外が入力された場合(四則演算)、
        canAddDecimalPoint = true;  //小数点が追加できる
    }

    //5/25 17:39 〜　18:33　解決済み　→　*と/が認識されてない。　
    //❶記述が間違っている？testメゾットについて調べる。
    //❷console.logを使う　/と*をクリックした時だけコンソールが表示されない。
    //❸÷と×表示が変換されていない？　記述の順番を入れ替えてみたが、変わらない。
    //❹÷と×表示が変換されていない？(2) operatorRegに÷と×を足してみた。→できた！
  
    //もし四則演算がクリックされて、且つ(&&)ひとつ前に既に四則演算がクリックされている場合、
    if (operatorReg.test(value) && operatorReg.test(preValue)) {
        console.log(value);
        return; //何もしない。
    }
 

    //?下の00を0にするのとおなじこと書いてる？　0を連続で入れないようにしてるだけ
    //もし、0をクリックしたとき、
    if (value =="0"|| value =="00") {
        if (allDisplay =="0") { //ディスプレイが0のみの状態の場合なら
            return; //何もしない。
        }else if ( /^([1-9]|\.)$/.test(preValue) || operatorReg.test(preValue)) { // ひとつ前が、数字,小数点or四則演算だったら、
            allDisplay = document.dentaku.display.value; //ディスプレイに追加する。 
        }
    }

    //解決済み　→　小数点を入力しても０が消えてしまう、数字以外の何でも消えてしまう。
    //❶/^([1-9])$/　の後に　.test(value)を入れてみる　→できた！
    //0以外の数字がクリックされたとき、クリックする前が0のみの時、その0を消す。
    if ( /^([1-9])$/.test(value) ){
        if (allDisplay =="0"){     //クリックする前のディスプレイが0のみのとき、
            document.dentaku.display.value = "";  //ディスプレイの入力を全て消し、
            allDisplay = document.dentaku.display.value;  //クリックした数字を入れる。
        }
    }


    //四則演算の後の0も後に数字が来たら0を消す。小数点や四則演算が来たらそのまま。
    if(preValuetwo == "+0" || preValuetwo == "-0" || preValuetwo == "÷0" ||preValuetwo == "×0") {  //❻ディスプレイが四則演算＋０になっている場合、
        if (operatorReg.test(value)||value =="."){  //その後に四則演算、小数点を押したら、
            allDisplay = document.dentaku.display.value; //そのまま追加
        } else if (numReg00.test(value)){         //それ以外（数字）が押されたとき、
            let zero = allDisplay.slice(0,-1);  //「zero」はディスプレイの最後の文字を抜いたもの
            document.dentaku.display.value = zero; //ディスプレイは「zero」の状態となり、
        } else if (value == "00") {
            return;
        }
    }

    //四則演算後の0の後、0を押したときは、押せない。
    //四則演算後の0の後、00を1回押すと[0]になって入力されてしまう、00を2回押すと[00]が通常で入力されてしまう
    //上のnumRegは00も含まれている、00を押したときは、一個前の0のみを消されて、ひとつ表示されてしまう？ →00はreturnで解決


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
            btn.value = "0"; //0とする。
        }

        document.dentaku.display.value += btn.value;
        document.dentaku.multi_btn.value = "×";
        document.dentaku.div_btn.value = "÷";
        document.dentaku.zerozero_btn.value = "00";
    }
}

