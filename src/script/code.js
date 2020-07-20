let contentDom;
let lisDom;
let selectedDom;
let selObj;
window.onload = function() {
    addListener();
    contentDom = document.getElementById('content');
    lisDom = contentDom.getElementsByTagName('p');
}

let getSelectedContentState = function(state) {
    let selection = window.getSelection();
    if(!(selection && selection.baseNode))  {
        return;
    }
    let range = selection.getRangeAt(0);  
    let docFragment = range.cloneContents();
    let res = {
        pre: range.startContainer.data.slice(0,range.startOffset),
        curr:docFragment,
        sel:appendDom(docFragment),
        end:range.endContainer.data.slice(range.endOffset),
        parentNode:range.commonAncestorContainer.parentNode
    }
    return res;
}

let appendDom = function(dom) {
    let middleDiv = document.createElement("div");
    middleDiv.appendChild(dom);
    let selectHtml = middleDiv.innerHTML;
    return selectHtml;
}

let changeTag = function(state) {
    if(!state) return;
    let selContent = document.getElementsByClassName('selectedVal');
    if(selContent.length === 0) {
        selObj = getSelectedContentState();
        if(selObj) {
            selObj.next = `<${state}>${selObj.sel}</${state}>`;
            let currStateHTML = `${selObj.pre}<span class="selectedVal">${selObj.next}</span>${selObj.end}`;
            selObj.parentNode.innerHTML = currStateHTML;
        }
    }else {
        let selection = window.getSelection();
        if(!(selection && selection.baseNode))  {
            return;
        }
        let range = selection.getRangeAt(0);  
        console.log(range)
    }
    
}

addListener = function() {
    window.addEventListener('mousedown', changeActiveState);
    window.addEventListener('click', changeActiveState);
}

changeActiveState = function() {
    let editorActiveBool = document.activeElement.id === 'content';
    if(editorActiveBool && selObj) {
        removeSelectedTag()
    }
}

let removeSelectedTag = function() {
    let currHTML = `${selObj.pre}${selObj.next}${selObj.end}`
    selObj.parentNode.innerHTML = currHTML;
    selObj = null;
}

