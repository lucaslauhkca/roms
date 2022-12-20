import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUniversityList } from '../../features/example/exampleSlice';
import ExampleComponent from '../../components/ExampleComponent';
import ExampleBox from '../../components/ExampleBox';
import { toggleSwitch } from '../../features/example/exampleSlice';

const ExampleHomePage = () => {
  //whenever the value of a state is changed, the DOM will re-render
  //hence the new value will be shown in the page
  const [countryName, setCountryName] = useState('');

  //you can get the states from the reducers you included in the store
  //same as local state, DOM will re-render when these states are changed
  const { isLoading, exampleList, isSwitchOn } = useSelector(
    (state) => state.example
  );

  //dispatch must be used when you want to carry out an action inside a reducer
  const dispatch = useDispatch();

  //if the bracket is empty, the function will be triggered when the component is FIRST loaded
  useEffect(() => {
    alert('Welcome!');
  }, []);

  //if the variables inside the bracket changed, the function will be triggered
  useEffect(() => {
    if (isSwitchOn) {
      console.log('The switch is on');
    } else {
      console.log('The switch is off');
    }
  }, [isSwitchOn]);

  const onCountryChanged = (e) => {
    //get the value inside the input field
    setCountryName(e.target.value);
  };

  const callAPI = () => {
    if (countryName.length === 0) {
      return;
    }
    //dispatch the get univerity list action
    dispatch(getUniversityList(countryName));
  };

  const onBoxClicked = () => {
    //dispatch the toggle switch action
    dispatch(toggleSwitch());
  };

  return (
    <>
      <div className='container pt-5'>
        <h2>Example Home Page 2</h2>

        <div className='row'>
          <div className='col-6'>
            {/*useState example */}
            <form>
              <div class="mb-3">
                <label for="inputCountry" class="form-label">Country</label>
                <input id="inputCountry" value={countryName} onChange={onCountryChanged} placeholder="enter a country"  type="text" class="form-control"/>
              </div>
            </form>
            
            {/*To use a state inside a paragraph */}
            <p>You are searching for universities in this country: {countryName}</p>
            
            {/*Call API and useSelector example */}
            <button className="btn btn-outline-dark" onClick={callAPI}>
              Search for universities in this country(Call API)
            </button>

            {/* this is the way to loop through the list and create a list of items*/}
            {exampleList?.map((item, index) => {
              //remember to add a key to each component to avoid warning
              return <ExampleComponent key={index} somePropName={item} />;
            })}

            {/*show spinner only when the isLoading state is true */}
            {isLoading && <div class="spinner-border text-primary"></div>}
          </div>

          <div className='col-6'>
            {/*Dispatch action and useEffect example */}
            <ExampleBox onClick={onBoxClicked} />
            <p>click the box above to see useEffect in action</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleHomePage;
