import { useSelector } from 'react-redux';

//passing a function as a prop
const ExampleBox = ({ onClick }) => {
  const { isSwitchOn } = useSelector((state) => state.example);
  return (
    <div
      //please avoid inline styling, this is for quick demo only
      style={{
        background: isSwitchOn ? 'green' : 'red',
        height: '100px',
        width: '100px',
      }}
      onClick={onClick}
    ></div>
  );
};

export default ExampleBox;
