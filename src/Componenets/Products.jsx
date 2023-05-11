import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { ProdItem } from "./ProdItem";
import { Container } from "react-bootstrap";

export const Products = () => {
    const [filtered, setFiltered] = useState([])
    const { search_query, products } = useSelector((state) => state);

    useEffect(() => {
        setFiltered(products.sort((a, b) => b.ID - a.ID))
    }, [products])


    useEffect(() => {
        setFiltered(products.filter((item) => item.name.includes(search_query)))
    }, [search_query])

    const editItem = (name, value, id) => {
        let temp = [...filtered]
        let index = filtered.findIndex((item) => item.ID === id)
        temp[index][name] = value
        setFiltered(temp)
    }
    return (
        <>
            {filtered?.map((product, idx) => {
                return (
                    <Container key={idx} >
                        <ProdItem product={product} products={filtered} editItem={editItem} />
                    </Container>
                )
            })}
        </>
    )
}