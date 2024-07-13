const InputC = document.getElementsByTagName('input');
const labelC = document.getElementsByTagName('label');

function changeValue(){
    for(let i=0; i<InputC.length; i++){
        if (InputC.item(i).value == '') {
            labelC.item(i).style.cssText = 'position:absolute; top:35px; left:12px; font-size:16px';
        } else {
            labelC.item(i).style.cssText = 'font-size:small; color:gray; transform:translate(-5px, -15px);';
        }
    }
}

