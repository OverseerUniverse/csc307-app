interface CharacterProps {
  _id: string;
  name: string;
  job: string;
}

interface CharacterList {
  characterData: CharacterProps[];
  removeCharacter: (characterData: number) => void;
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}

function TableBody({characterData = [], removeCharacter} : CharacterList) {
  const rows = characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row._id}</td>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => removeCharacter(index)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function Table(props: CharacterList) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default Table;
