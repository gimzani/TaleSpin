//---------------------------------------------
import swal from 'sweetalert'
//---------------------------------------------
export function useDialog() {
  return {
    message,
    confirm,
    prompt
  }
}
//---------------------------------------------
export async function message(options) {
  let obj = {
    title: "Message", 
    text: "Please enter a message.",
    confirmButton: 'Ok'
  }
  Object.assign(obj, options);
  if(obj.title) {
    swal({
      text: obj.text,
      title: obj.title,
      buttons: {
        confirm: obj.confirmButton 
      }
    });
  } else {
    swal(obj.text);
  }
}
//---------------------------------------------
export async function confirm(options) {
  let obj = {
    title: null, 
    text: "Please enter a message.",
    cancelButton: 'Cancel',
    confirmButton: 'Ok'
  }
  Object.assign(obj, options);
  let confirm = await swal({
    title: obj.title,
    text: obj.text,
    icon: false,    
    buttons: { 
      cancel: obj.cancelButton, 
      confirm: obj.confirmButton 
    }
  })
  return confirm ? true : false;
}
//---------------------------------------------
export async function prompt(options) {
  let obj = {
    title: "Message", 
    text: "Please enter a message.",
    cancelButton: 'Cancel',
    confirmButton: 'Ok'
  }
  Object.assign(obj, options);
  let confirm = await swal({
    title: obj.title,
    text: obj.text,
    icon: false,    
    buttons: { 
      cancel: obj.cancelButton, 
      confirm: obj.confirmButton 
    },
    content: {
      element: "input",
      attributes: {
        placeholder: "Story Name",
        type: "text",
      },
    },
  })
  return confirm;
}
//---------------------------------------------