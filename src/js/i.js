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
/*
This Function will convert herders into something like this
const menu = [
    // depth 2
    {
        text:"...",
        link:"...",
        // depth 3
        menu: [
            text:"",
            link:"..."
        ]
    }
]
*/
function returnArrows(arr, type) {
  const arr_itr = arr[Symbol.iterator]();
  let result = {};
  let prev;
  while (true) {
    let b = arr_itr.next();
    if (prev == undefined) prev = b;
    while (b.value?.depth >= prev.value?.depth) {
      let prev1 = b;
      result[b.value[type]] = {};
      b = arr_itr.next();
      while (b.value?.depth > prev1.value?.depth) {
        let prev2 = b;
        result[prev1.value[type]][b.value[type]] = {};
        b = arr_itr.next();
        while (b.value?.depth > prev2.value?.depth) {
          let prev3 = b;
          result[prev1.value[type]][prev2.value[type]][b.value[type]] = {};
          b = arr_itr.next();
          while (b.value?.depth > prev3.value?.depth) {
            let prev4 = b;
            result[prev1.value[type]][prev2.value[type]][prev3.value[type]][
              b.value[type]
            ] = {};
            b = arr_itr.next();
          }
        }
      }
    }
    if (b.done) {
      break;
    }
    prev = b;
  }
  return result;
}

function menuObj(text, link, depth, header) {
    if(header)
        return {text,link,depth,header}
    return {text,link,depth}
}

function getC(b,prev3) {
  let r4;
  while (b.value?.depth > prev3.value?.depth) {
    let prev4 = b;
    r4 = [...r4, menuObj(prev4.value?.text, prev4.value?.slug, [])];
    b = arr_itr.next();
  }
  return [r4,arr_itr];
}

console.log(getMenuWithWhile(headers));

function printAll(headers){
    headers.map((header)=>{
        console.log("HEADERLINK",header,"HEADERDEPTH",header?.depth);
        if(header.header){
            printAll(header.header);
        }
    })
}
// printAll(getMenuWithWhile(headers));

// let prev3 = b;
// b = arr_itr.next();
// let r4 = [];
// while (b.value?.depth > prev3.value?.depth) {
//   let prev4 = b;
//   r4 = [...r4, menuObj(prev4.value?.text,prev4.value?.slug,prev4?.value.depth)];
//   b = arr_itr.next();
// }
// r3 = [...r3, menuObj(prev3.value?.text,prev3.value?.slug,prev3?.value.depth,r4)];
function r_o(current,prev,itr,r) {
   // need a value of current, prev, itr, r
    while (current.value?.depth > prev.value?.depth) {
      let prev2 = current;
      current = itr.next();
      let r2 = [];
      //      
      // current, prev2, itr, r2, 
      // while (b.value?.depth > prev3.value?.depth) {
      //   let prev4 = b;
      //   r4 = [...r4, menuObj(prev4.value?.text,prev4.value?.slug,prev4?.value.depth)];
      //   b = arr_itr.next();
      // }
      r2 = r_o(current,prev2,itr,r2);
      r = [
        ...r, 
        menuObj(prev2.value?.text,prev2.value?.slug,prev2?.value.depth,r2)
      ];
    }
    return r;
}
function getMenu(arr) {
  const arr_itr = arr[Symbol.iterator]();
  let result = [];
  let prev;
  while (true) {
    let b = arr_itr.next();
    if (prev === undefined) prev = b;
    while (b.value?.depth >= prev.value?.depth) {
      let prev1 = b;
      b = arr_itr.next();
      let r2 = [];
      r2 = r_o(b,prev1,arr_itr,result);
      result = [...result, menuObj(prev1.value?.text,prev1.value?.slug,prev1?.value.depth,r2)];
    }
    if (b.done) {
      break;
    }
    prev = b;
  }
  return result;
}

function recusiveWhileLoopReplaceMent(b,itr,r) {
    if(b.value.done){
        return [];
    }
    let prev = b;
    b = itr.next();
    if( !(b.value?.depth > prev.value?.depth) )
        return [];
    r = [
        ...r,
        menuObj(prev.value?.text,prev.value?.slug,prev.value?.depth,[])
    ];
    return r;
}

function getMenuWithWhile(arr) {
  const arr_itr = arr[Symbol.iterator]();
  let result = [];
  let prev;
  while (true) {
    let b = arr_itr.next();
    if (prev === undefined) prev = b;
    while (b.value?.depth >= prev.value?.depth) {
      let prev1 = b;
      b = arr_itr.next();
      let r2 = [];
      while (b.value?.depth > prev1.value?.depth) {
        let prev2 = b;
        b = arr_itr.next();
        let r3 = [];
        while (b.value?.depth > prev2.value?.depth) {
          let prev3 = b;
          b = arr_itr.next();
          let r4 = [];
          while (b.value?.depth > prev3.value?.depth) {
            let prev4 = b;
            r4 = [...r4, menuObj(prev4.value?.text,prev4.value?.slug,prev4?.value.depth)];
            b = arr_itr.next();
          }
          r3 = [...r3, menuObj(prev3.value?.text,prev3.value?.slug,prev3?.value.depth,r4)];
        }
        r2 = [...r2, menuObj(prev2.value?.text,prev2.value?.slug,prev2?.value.depth,r3)];
      }
      // r2 = r_outlet(b,arr_itr,[]);
      console.log("DUe R2",r2)  
      result = [...result, menuObj(prev1.value?.text,prev1.value?.slug,prev1?.value.depth,r2)];
    }
    if (b.done) {
      break;
    }
    prev = b;
  }
  return result;
}
