import './App.css';

import { Container, Button, Label, TextInput, Divider, ArrayInput } from '@playcanvas/pcui/pcui-react.js';
import { BindingTwoWay, Observer } from '@playcanvas/pcui/pcui-binding.js';
import React, { useState } from 'react';

const observer = new Observer({ status: 'Status: ok', locations: {}, locationImages: {} });
let token;
let projectId;
let locationId = -1;
let addUrls;

function App() {

  return (
    <Container class={'bgc1'}>
      <TopPanel />
      <Divider />
      <SelectPanel />
      <Divider />
      <AddPanel />
    </Container>
  );
}

export default App;

// UI Panels
function TopPanel() {
  const statusLink = { observer, path: 'status' };
  return (
    <Container height={40}>
      <Label text='SiteHub' />
      <TextInput placeholder='enter project id' onChange={enterProjectId}/>
      <TextInput placeholder='enter lambda token' onChange={enterToken}/>
      <Button text="Find Location" icon='E129' enabled={true} onClick={loadLocations} />
      <Label binding={new BindingTwoWay()} link={statusLink} />
    </Container>
  );
}

function SelectPanel() {
  const [ locations, setLocations ] = useState({});
  observer.on('locations:set', setLocations);

  const [ locationImages, setLocationImages ] = useState({});
  observer.on('locationImages:set', setLocationImages);

  return (
  <Container class={'col2'}>
    <Label text='Locations' />
    <Container class={'bgc2'} hidden={false} height={250} scrollable={true}>
      {
        locations?.value?.map(key => {
          return [
            <Button text={`Select > id: ${key.id}  title: ${key.title}`} icon='E131' width={220} enabled={true} onClick={() => loadLocationImages(key)} />
          ];
        })
      }
    </Container>
      <Label text='Location Images' />
      <Container class={'bgc3'} hidden={false} height={250} scrollable={true}>
      {
        locationImages?.value?.map(key => {
          return [
            <Container>
              <Label text={`id: ${key.id} - Name: ${key.imageURL.split('/').reverse()[0]}`} />
              <Button text="Open" icon='E117' width={80} enabled={true} onClick={() => {window.open(key.imageURL)}} />
              <Button text="Delete" icon='E124' width={80} enabled={true} onClick={() => deleteLocationImages(key.id)} />
            </Container>
          ];
        })
      }
    </Container>
  </Container>
  );
}

function AddPanel() {
  return (
    <Container class={'bgc4'} >
      <Label text='Add URLs' />
      <ArrayInput enabled={true} width={720} onChange={(value) => changeLocationImageArrayInput(value)} type="string"/>
      <Button text="Apply" icon='E133' enabled={true} onClick={() => postLocationImages()} />
    </Container>
  );
}

// UI Events
const enterToken = (value) => {
  token = value;
  console.log('token =', token);
};

const enterProjectId = (value) => {
  projectId = value;
  console.log('projectId =', projectId);
};

const changeLocationImageArrayInput = (key) => {
  addUrls = key;
  console.log('changeLocationImages', addUrls);
}

// Requests
const loadLocations = () => {
  locationId = -1;
  observer.set('locations',{});
  observer.set('locationImages', {});
  observer.set('status', `Status: finding locations for project id: ${projectId}`);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("project_id", projectId);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders
  };
  
  fetch("https://tj3c710g60.execute-api.us-west-1.amazonaws.com/dev/core/locations", requestOptions)
    .then(response => response.text())
    .then(result => {
      const value = JSON.parse(result);
      console.log('Location count:', value?.length);
      observer.set('status', `Status: finded [${value?.length}] locations`);
      observer.set('locations', {value});
    })
    .catch(error => {
      console.log('error', error);
      observer.set('status', `Status: error [${error}]`);
    });
  console.log('loadLocations =', projectId);
};

const loadLocationImages = (key) => {
  locationId = -1;
  observer.set('locationImages', {});
  observer.set('status', `Status: loading images for location id: ${key.id}`);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("location_id", key.id);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  
  fetch("https://tj3c710g60.execute-api.us-west-1.amazonaws.com/dev/core/location-images", requestOptions)
    .then(response => response.text())
    .then(result => {
      const value = JSON.parse(result);
      console.log('Location count:', value?.length);
      value?.sort((a,b) => a.id - b.id);
      observer.set('locationImages', {value});
      observer.set('status', `Status: loaded [${value?.length}] images for location id: ${key.id}`);
      locationId = key.id;
    })
    .catch(error => {
      console.log('error', error);
      observer.set('status', `Status: error [${error}]`);
    });
};

const postLocationImages = () => {
  
  if (addUrls?.length === 0 || addUrls ===null) {
    observer.set('status', `Status: need add URLs`);
    return;
  }

  let limg = []; 
  
  for (let a of addUrls) {
    if (a !== '' & a !==undefined) {
      limg.push({
        locationId,
        imageURL: a,
      });
    }
  }

  if (limg?.length === 0) {
    observer.set('status', `Status: URL field(s) is empty`);
    return;
  }

  if (locationId < 0) {
    observer.set('status', `Status: need select locationId`);
    return;
  }

  observer.set('status', `Status: start adding [${addUrls?.length}] images to locationId: [${locationId}]`);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(limg);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  
  fetch("https://tj3c710g60.execute-api.us-west-1.amazonaws.com/dev/core/location-images", requestOptions)
    .then(response => response.text())
    .then(result => {
      observer.set('status', `Status: added [${addUrls?.length}] images to locationId: [${locationId}]`);
      console.log(result);
      result = JSON.parse(result);
      const value = observer.get('locationImages').value;
      for (const i of result) {
        value.push(i)
      }
      value?.sort((a,b) => a.id - b.id);
      observer.set('locationImages', {});
      observer.set('locationImages', {value});
    })
    .catch(error => {
      console.log('error', error);
      observer.set('status', `Status: error [${error}]`);
    });
}

const deleteLocationImages = (key) => {
  console.log('delete img id =', key);
  observer.set('status', `Status: start deleting image id [${key}] in locationId: [${locationId}]`);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.pF3q46_CLIyP_1QZPpeccbs-hC4n9YW2VMBjKrSO6Wg");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify([{id:key}]);

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
  };

  fetch("https://tj3c710g60.execute-api.us-west-1.amazonaws.com/dev/core/location-images", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      observer.set('status', `Status: deleted image id [${key}] in locationId: [${locationId}]`);
      const value = observer.get('locationImages').value;
      const foundIndex = value.findIndex(e => e?.id === key);
      delete value[foundIndex];
      value?.sort((a,b) => a.id - b.id);
      observer.set('locationImages', {});
      observer.set('locationImages', {value});
    })
    .catch(error => {
      console.log('error', error);
      observer.set('status', `Status: need select locationId`);
    });

}