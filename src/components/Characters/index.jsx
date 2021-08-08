import PropTypes from "prop-types";


const Characters = (props) => {

    const {characters = []} = props;

  return (
    <ul style={{padding: "0" }}>
      {characters.map((e) => {
        return (
          <li key={e.id} style={ {border: '1px solid black', marginTop: '10px', backgroundColor: 'lightGrey', listStyleType: "none"}}>
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
