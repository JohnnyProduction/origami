/**
 * 
 * @param {number} from 
 * @param {number} to
 * @param {[fieldName:string, back:boolean]} sort
 * @param {[fieldName:string, query:any][]} filter
 * @return
 */
function getCategories(from, to, sort, filter) {
    const avatarRoot = "./imgs";
    const categories = [
        {
            id: 0,
            name: "ITEM 0",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 4,
        },
        {
            id: 1,
            name: "ITEM 1",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 5,
        },
        {
            id: 2,
            name: "ITEM 2",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 10,
        },
        {
            id: 3,
            name: "ITEM 3",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 1,
        },
        {
            id: 4,
            name: "ITEM 4",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 7,
        },
        {
            id: 5,
            name: "ITEM 5",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 3,
        },
        {
            id: 6,
            name: "ITEM 6",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 8,
        },
        {
            id: 7,
            name: "ITEM 7",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 8,
        },
        {
            id: 8,
            name: "ITEM 8",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 4,
        },
        {
            id: 9,
            name: "ITEM 9",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 6,
        },
        {
            id: 10,
            name: "ITEM 10",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 7,
        },
        {
            id: 11,
            name: "ITEM 11",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 4,
        },
        {
            id: 12,
            name: "ITEM 12",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 6,
        },
        {
            id: 13,
            name: "ITEM 13",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 8,
        },
        {
            id: 14,
            name: "ITEM 14",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 10,
        },
        {
            id: 15,
            name: "ITEM 15",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 6,
        },
        {
            id: 16,
            name: "ITEM 16",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 5,
        },
        {
            id: 17,
            name: "ITEM 17",
            avatar: `${avatarRoot}/logo-fox.svg`,
            rating: 3,
        },
    ];

    let filtered = categories;
    if (filter) {
        filtered = categories.filter((c) => {
            return filter.reduce((result, f) => {
                if (typeof c[f[0]] === "string") {
                    return result && c[f[0]].indexOf(f[1]) >= 0; 
                }
                return result && c[f[0]] === f[1];
            }, true);
        });
    }

    if (sort) {
        filtered.sort((a, b) => {
            if (sort[1]) {
                return a[sort[0]] < b[sort[0]] ? 1 : -1;
            } else {
                return a[sort[0]] > b[sort[0]] ? 1 : -1;
            }
        });
    }

    return new Promise((resolve) => {
        setTimeout(() => resolve({
        total: filtered.length,
        from: from,
        to: to,
        payload: filtered.splice(from ,to),
    }), 600);
}


console.log(getCategories(0, 5, ["id", true], [["name", "ITEM 1"]]));