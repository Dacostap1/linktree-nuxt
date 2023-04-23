export const useHelpers = () => {
  const hidePageOverflow = (val, id) => {
    document.body.style.overflow = val ? "hidden" : "visible";
    if (!id) return;
    document.getElementById(id).style.overflow = val ? "hidden" : "visible";

    // if (val) {
    //   document.body.style.overflow = "hidden";
    //   if (id) {
    //     document.getElementById(id).style.overflow = "hidden";
    //   }
    //   return;
    // }
    // document.body.style.overflow = "visible";
    // if (id) {
    //   document.getElementById(id).style.overflow = "visible";
    // }
  };

  const allLowerCaseNotcaps = (str) => {
    return str.split(" ").join("").toLowerCase();
  };

  return { hidePageOverflow, allLowerCaseNotcaps };
};
