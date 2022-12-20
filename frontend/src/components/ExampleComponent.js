//you can name the prop whatever you want
//but make you when passing from the upper layer, the prop name matches
const ExampleComponent = ({ somePropName }) => {
  //you have to deconstruct the object depending on the structure
  //you may have to deconstruct two times if the field you want is nested
  const { name, web_pages } = somePropName;

  return (
    <div class="row justify-content-between mt-2">
      <div class="col">
        {name}
      </div>
      <div class="col-2 text-center">
        <a href={web_pages[0]} target="_blank" rel="noopener noreferrer">Link</a>
      </div>
    </div>
  );
};

export default ExampleComponent;
