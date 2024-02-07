import { format } from 'date-fns';

// ************* customDateFormat ************
// ใช้เวลาแสงผลวันที่ให้ถูกต้อง
export const customDateFormat = (date) => {
    if (date) {
      const thaiYear = new Date(date).getFullYear() + 543;
      return format(new Date(date), `dd/MM/${thaiYear}`);
    }
  };

// ใช้กับ calendar
export const formatDate = (value) => {
  if (!value) {
    return ""; // หรือค่าที่คุณต้องการในกรณีที่ไม่มีค่า
  }
  if (!(value instanceof Date)) {
    // ในกรณีที่ value ไม่ใช่ Date object
    // คุณอาจต้องแปลง value เป็น Date object ก่อน
    value = new Date(value);
  }
  return value.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatCurrency = (value) => {
  if (typeof value === "string") {
    value = value.replace(",", "");
  }
  value = parseFloat(value);
  return value.toLocaleString("th-TH", { style: "currency", currency: "THB" });
};

export const formatNumber = (value) => {
  value = parseInt(value);
  return value.toLocaleString({ style: "currency", currency: "THB" });
};

export const limitLengthAndNumber = (event,length) => {
  if (!/^\d$|^Backspace$|^Delete$/.test(event.key)) {
    event.preventDefault();
    return;
  }
  let inputValue = event.target.value;
  if (
    inputValue.length >= length &&
    event.key !== "Backspace" &&
    event.key !== "Delete"
  ) {
    event.preventDefault();
    return;
  }
};

export const validatePhoneNumber = (event) => {
  let number = (event.target.value + event.key).replace(/\D/g, "");

  if (
    (number.length >= 2 && ["0", "1", "7", "4"].includes(number[1])) ||
    !["0"].includes(number[0])
  ) {
    event.preventDefault();
    // supplier_phone.value = supplier_phone.value;
  }
};


export const roundToTwoDecimalPlaces =(number)=> {
    // ใช้ parseFloat เพื่อแปลงค่าเป็นทศนิยม (หากยังไม่ได้เปลี่ยน)
    const roundedNumber = parseFloat(number.toFixed(2));
    return roundedNumber;
  }