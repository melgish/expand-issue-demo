import { useState } from 'react';

// spell-checker: words Arcgis basemap
import Circle from '@arcgis/core/geometry/Circle';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';

import type { ArcgisMapCustomEvent } from '@arcgis/map-components';

import '@arcgis/map-components/dist/components/arcgis-expand';
import '@arcgis/map-components/dist/components/arcgis-home';
import '@arcgis/map-components/dist/components/arcgis-layer-list';
import '@arcgis/map-components/dist/components/arcgis-map';
import '@arcgis/map-components/dist/components/arcgis-zoom';

import {
  ArcgisExpand,
  ArcgisHome,
  ArcgisLayerList,
  ArcgisMap,
  ArcgisZoom,
} from '@arcgis/map-components-react/dist/components';

const center = new Point({ longitude: -82.7, latitude: 27.9 });
const zoom = 6;

function createCircleLayer() {
  const layer = new GraphicsLayer({ title: 'Demo Layer' });
  const circle = new Graphic({
    geometry: new Circle({
      center,
      radius: 35,
      radiusUnit: 'miles',
    }),
    symbol: new SimpleFillSymbol({
      style: 'none',
      outline: { color: [0, 0, 153], width: 1 },
    }),
  });
  layer.add(circle);
  return layer;
}

function createGeoJSONLayer() {
  const url = URL.createObjectURL(
    new Blob(
      [
        JSON.stringify({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-82.7, 27.9],
              },
              properties: {
                name: 'Tampa Bay Area',
                state: 'Florida',
              },
            },
          ],
        }),
      ],
      { type: 'application/json' }
    )
  );
  const layer = new GeoJSONLayer({
    url,
    title: 'Demo Features',
    popupTemplate: {
      title: '{name}',
      content: '{state}',
    },
    renderer: new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        style: 'circle',
        color: [255, 0, 0, 0.5],
        size: 10,
        outline: {
          color: [0, 0, 0, 0.5],
          width: 1,
        },
      }),
    }),
  });
  return layer;
}

function onViewReady(event: ArcgisMapCustomEvent<void>) {
  console.debug('View ready %O', event.target.view);
  // add some layers to show in the expand
  event.target.view.map.add(createCircleLayer());
  event.target.view.map.add(createGeoJSONLayer());
}

export default function App() {
  const [show, setShow] = useState(true);
  const toggle = () => setShow((before) => !before);
  return (
    <div>
      <button onClick={toggle}>Toggle Visibility</button>
      {show && (
        <ArcgisMap
          basemap="streets-navigation-vector"
          center={center}
          className="map"
          onArcgisViewReadyChange={onViewReady}
          zoom={zoom}>
          <ArcgisZoom position="top-left" />
          <ArcgisHome position="top-left" />
          <ArcgisExpand position="top-left" expandIcon="layers">
            <ArcgisLayerList />
          </ArcgisExpand>
        </ArcgisMap>
      )}
    </div>
  );
}
