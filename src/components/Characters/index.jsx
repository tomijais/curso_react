import PropTypes from "prop-types";


const Characters = (props) => {

    const {characters = []} = props;

  return (
    <ul>
      {characters.map((e) => {
        return (
          <li key={e.id}>
            <h2>{e.name}</h2>
            <img src={e.image} alt={`Imagen de ${e.name}`} />
            <p>{e.species}</p>
          </li>
        );
      })}
    </ul>
  );
};

Characters.propTypes = {
    characters: PropTypes.array.isRequired
}

export default Characters;
