L = [
    { id: 6511234, name: 'Jack', salary: 10000 },
    { id: 6511235, name: 'Mike', salary: 15000 },
    { id: 6511236, name: 'Nancy', salary: 20000 },
    { id: 6511237, name: 'Alice', salary: 30000 },
]

// console.log(L[0].name)
// for(let i=0; i<L.length; i++) {
//     L[i].salary *= 1.1
// }

// L.map((emp) => emp.salary *= 1.1)

// L.map((emp) => emp.bonus = emp.salary * 0.2)

L.map((emp) => {
    emp.salary *= 1.1
    emp.bonus = emp.salary * 0.2
})

L.sort((a,b) => a.name.localeCompare(b.name))
console.table(L)
