import React from 'react';
import { render } from 'react-dom';
import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';
import DeckGL, { SimpleMeshLayer, ScenegraphLayer } from 'deck.gl';
import { load } from "@loaders.gl/core";
import { OBJLoader } from "@loaders.gl/obj";
import { GLTFLoader, GLTFScenegraph } from "@loaders.gl/gltf";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmVuZGdvbWluMzMzIiwiYSI6ImNrbzJzcThwZjBsbm0zMHE5NnY4a3htNDIifQ.OlRSmGAfK3i6C2gbQACieA'

const INITIAL_VIEW_STATE = {
  longitude: 37.617734,
  latitude: 55.751999,
  zoom: 14,
  bearing: 0,
  pitch: 30
};

const MAP_STYLE = 'mapbox://styles/mapbox/light-v10'; //'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10
};


const data = [
  { id: 1, name: 'First', coordinates: [37.617734, 55.751999] }
]

function Root() {
  const layers = [
    new SimpleMeshLayer({
      id: 'mesh-layer',
      data,
      texture: 'building.png',
      mesh: 'sw.obj',
      getPosition: d => d.coordinates,
      getOrientation: d => [0, 0, 90],
      sizeScale: 5,
      loaders: [OBJLoader]
    }),
    new ScenegraphLayer({
      id: 'scenegraph-layer',
      data,
      scenegraph: 'scene.gltf',
      sizeScale: 5,
      _lighting: 'pbr',
      getPosition: d => [d.coordinates[0] - 0.013, d.coordinates[1]],
      getOrientation: d => [0, 0, 90]
    })
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      ContextProvider={MapContext.Provider}
    >
      <StaticMap mapStyle={MAP_STYLE} mapboxApiAccessToken={MAPBOX_TOKEN} />
      <NavigationControl style={NAV_CONTROL_STYLE} />
    </DeckGL>
  );
}

render(<Root />, document.body.appendChild(document.createElement('div')));

