import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { fetchPokemonDetail, fetchPokemonList } from "./redux/pokemonSlice";

const App = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.pokemon.list);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  const toggle = (shouldFetch) => {
    if (shouldFetch) {
      dispatch(fetchPokemonDetail(1));
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Container>
        {list.map((pokemon) => (
          <Card
            style={{ marginBottom: 10 }}
            key={pokemon.name}
            onClick={toggle}
          >
            <CardBody>
              <CardTitle>{pokemon.name}</CardTitle>
            </CardBody>
          </Card>
        ))}
      </Container>
      <Modal toggle={toggle} isOpen={isOpen}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>test</ModalBody>
      </Modal>
    </>
  );
};

export default App;
