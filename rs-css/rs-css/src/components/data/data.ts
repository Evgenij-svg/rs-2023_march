const Levels = [
  [
    [
      {
        tag: "plate",
        anim: true,
      },
      {
        tag: "plate",
        anim: true,
      },
    ],
    "Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.",
    "plate",
  ],
  [
    [
      {
        tag: "plank",
      },
      {
        tag: "plate",
        anim: true,
      },
      {
        tag: "plank",
      },
    ],
    "Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.",
    "plate",
  ],
  [
    [
      {
        tag: "plate",
        id: "fancy",
        anim: true,
      },
      {
        tag: "plate",
      },

      {
        tag: "plank",
      },
    ],
    "#id Selects the element with a specific id. You can also combine the ID selector with the type selector.",
    "#fancy",
  ],
  [
    [
      {
        tag: "plank",
      },
      {
        tag: "plate",
        child: {
          tag: "apple",
          anim: true,
        },
      },
      {
        tag: "apple",
      },
    ],
    "Selects all B inside of A. B is called a descendant because it is inside of another element.",
    "plate apple",
  ],
  [
    [
      {
        tag: "plank",
        child: {
          tag: "orange",
        },
      },
      {
        tag: "plate",
        id: "fancy",
        child: {
          tag: "cucumber",
          anim: true,
        },
      },
      {
        tag: "plate",
        child: {
          tag: "cucumber",
        },
      },
    ],
    "Combine the Descendant & ID Selectors #id  A You can combine any selector with the descendent selector.",
    "#fancy cucumber",
  ],
  [
    [
      {
        tag: "apple",
      },
      {
        tag: "apple",
        clas: "small",
        anim: true,
      },
      {
        tag: "plate",
        child: {
          tag: "apple",
          clas: "small",
          anim: true,
        },
      },
      {
        tag: "plate",
      },
    ],
    "Class Selector Select elements by their class .classname The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.",
    ".small",
  ],
  [
    [
      {
        tag: "apple",
      },
      {
        tag: "apple",
        clas: "small",
      },
      {
        tag: "plank",
        child: {
          tag: "orange",
          clas: "small",
          anim: true,
        },
      },
      {
        tag: "plate",
        child: {
          tag: "orange",
        },
      },
      {
        tag: "plate",
        child: {
          tag: "orange",
          clas: "small",
          anim: true,
        },
      },
    ],
    "Combine the Class Selector A.className You can combine the class selector with other selectors, like the type selector.",
    "orange.small",
  ],
  [
    [
      {
        tag: "plank",
        child: {
          tag: "orange",
        },
      },
      {
        tag: "orange",
        clas: "small",
      },
      {
        tag: "plank",
        child: {
          tag: "orange",
          clas: "small",
          anim: true,
        },
      },
      {
        tag: "plank",
        child: {
          tag: "apple",
          clas: "small",
        },
      },
      {
        tag: "plank",
        child: {
          tag: "orange",
          clas: "small",
          anim: true,
        },
      },
    ],
    "You can do it... Put your back into it!",
    "plank orange.small",
  ],
  [
    [
      {
        tag: "apple",
        clas: "small",
      },
      {
        tag: "apple",
      },
      {
        tag: "plate",
        anim: true,
        child: {
          tag: "apple",
        },
      },
      {
        tag: "plank",
        anim: true,
        child: {
          tag: "apple",
        },
      },
      {
        tag: "plate",
        anim: true,
        child: {
          tag: "apple",
        },
      },
      {
        tag: "apple",
      },
      {
        tag: "apple",
        clas: "small",
      },
    ],
    "Comma Combinator Combine, selectors, with... commas! A, B Thanks to Shatner technology, this selects all A and B elements. You can combine any selectors this way, and you can specify more than two.",
    "plate,plank",
  ],
  [
    [
      {
        tag: "apple",
        anim: true,
      },
      {
        tag: "plate",
        anim: true,
        child: {
          tag: "orange",
          clas: "small",
        },
      },
      {
        tag: "plank",
        anim: true,
      },
      {
        tag: "plank",
        anim: true,
        child: {
          tag: "orange",
        },
      },
      {
        tag: "plate",
        anim: true,
        id: "fancy",
      },
    ],
    "The Universal Selector You can select everything! * You can select all elements with the universal selector!",
    "*",
  ],
];

export default Levels;
