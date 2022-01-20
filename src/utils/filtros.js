export const filtrarNombre = (nombre, bd) => {
    if(nombre===''){return bd}
    const nom = bd.filter(function (el) {
        return el.name.toLowerCase().indexOf(nombre.toLowerCase()) > -1;
    });
    return nom;
};

export const filtrarPrecio = (ar, valoaHasta, valorDesde) => {
    
    const precio= ar.filter(element=>{
        if (valoaHasta > valorDesde) {
            return element.price >= valorDesde && element.price <= valoaHasta
        } else {
            return element.price >= valorDesde
        }
        
    })
    return precio

};

export const filtrarTags = (ar, tags) => {
    const lista = [];
    if (tags.length===0) {return ar} else {
    for (const articulo of ar) {
        const articuloTags = articulo.tags;
        const arrayEquals = (a, b) => {
            return (
                Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index])
            );
        };
        arrayEquals(articuloTags, tags) ? lista.push(articulo) : console.log('no')

    }

    return lista;}
};

export const filtroSale = (ar, sale) => {
    if (sale==='false') {return ar.filter((function (el) {return el.sale===false;})) }
    if (sale==='true') {return ar.filter((function (el) {return el.sale===true;})) }
    else {return ar}
}