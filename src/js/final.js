const headers = [
  { depth: 2, slug: "astro-scroll-component", text: "Astro scroll component" },
  { depth: 3, slug: "lorem-new-est", text: "lorem New est" },
  { depth: 3, slug: "newest-news", text: "Newest news" },
  { depth: 2, slug: "first-news", text: "First news" },
  { depth: 3, slug: "second-news", text: "Second news" },
  { depth: 4, slug: "third-news", text: "Third news" },
  { depth: 4, slug: "it-should-be-four", text: "It should be four" },
  { depth: 2, slug: "next-topic", text: "Next Topic" },
  { depth: 4, slug: "third-news", text: "Third news" },
];

function makeArrayIterator(arr) {
  let index = -1;
  let arr_len = arr.length;
  let element = arr[index];
  const rangeIterator = {
    next: function () {
      if (index < arr_len) {
        index++;
        element = arr[index];
        return { value: element, done: false };
      }
      return { value: element, done: true };
    },
    prev: function () {
      let result;
      if (index < arr_len) {
        if (index === 0) return { value: null, last: true, done: false };
        index--;
        element = arr[index];
        result = { value: element, done: false };
        return result;
      }
      return { value: element, done: true };
    },
  };
  return rangeIterator;
}

function menuObj(text, link, depth, header) {
  if (header) return { text, link, depth, header };
  return { text, link, depth };
}

function r_o(current, prev, itr, r) {
  // need a value of current, prev, itr, r
  while (current.value?.depth > prev.value?.depth) {
    let prev2 = current;
    current = itr.next();
    let r2 = [];
    r2 = r_o(current, prev2, itr, r2);
    console.log(current);
    r = [
      ...r,
      menuObj(prev.value?.text, prev.value?.slug, prev?.value.depth, r2),
    ];
  }
  //   itr.pre
  return r;
}

function ro(current, itr, r) {
    let prev = current;
    current = itr.next();
    let r2 = [];
    while (current.value?.depth > prev.value?.depth) {
      let prev2 = current;
      current = itr.next();
      r2 = [...r2,ro(current,itr,r)];
    }
    r = [...r,menuObj(prev.value?.text, prev.value?.slug, prev?.value?.depth,r2)];
    return r;
}
//   let prev2 = b;
//   b = arr_itr.next();
//   let r3 = [];
//   while (b.value?.depth > prev2.value?.depth) {
//     let prev3 = b;
//     b = arr_itr.next();
//     let r4 = [];
//     while (b.value?.depth > prev3.value?.depth) {
//       let prev4 = b;
//       r4 = [
//         ...r4,
//         menuObj(prev4.value?.text, prev4.value?.slug, prev4?.value.depth),
//       ];
//       b = arr_itr.next();
//     }
//     r3 = [
//       ...r3,
//       menuObj(prev3.value?.text, prev3.value?.slug, prev3?.value.depth, r4),
//     ];
//   }
//   r2 = [
//     ...r2,
//     menuObj(prev2.value?.text, prev2.value?.slug, prev2?.value.depth, r3),
//   ];
// }

function getMenu(arr) {
  const arr_itr = makeArrayIterator(arr);
  let result = [];
  let prev;
  while (true) {
    let b = arr_itr.next();
    if (prev === undefined) prev = b;
    while (b.value?.depth > prev.value?.depth) {
      let prev1 = b;
      b = arr_itr.next();
      let r2 = [];
      r2 = ro(b, arr_itr, r2);
      result = [
        ...result,
        menuObj(prev1.value?.text, prev1.value?.slug, prev1?.value.depth, r2),
      ];
    }
    if (b.done) {
      break;
    }
    prev = b;
  }
  return result;
}

console.log(getMenu(headers));
