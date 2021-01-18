import { useState } from "react";
import Map from "../components/Map/Map";
import Layers from "../components/Layers/Layers";
import TileLayer from "../components/Layers/TileLayer";
import VectorLayer from "../components/Layers/VectorLayer";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { OSM, Vector } from "ol/source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import Controls from "../components/Controls/Controls";
import FullScreenControl from "../components/Controls/FullScreenControl";
import { geojsonObject, geojsonObject2 } from "../geojson/geojsondata";

export default function Dashboard() {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  let styles = {
    MultiPolygon: new Style({
      stroke: new Stroke({
        color: "blue",
        width: 1
      }),
      fill: new Fill({
        color: "rgba(0,0,255,0.1)"
      })
    }),
    Point: new Style({
      image: new CircleStyle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: "magenta"
        })
      })
    }),
    Polygon: new Style({
      stroke: new Stroke({
        color: "blue",
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: "rgba(0, 0, 255, 0.1)"
      })
    })
  };

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={OSM()} zIndex={0} />
          {showLayer1 && (
            <VectorLayer
              source={Vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get("EPSG:3857")
                })
              })}
              style={styles.MultiPolygon}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={Vector({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: get("EPSG:3857")
                })
              })}
              style={styles.MultiPolygon}
            />
          )}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
      <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={event => setShowLayer1(event.target.checked)}
        />{" "}
        Johnson County
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={event => setShowLayer2(event.target.checked)}
        />{" "}
        Wyandotte County
      </div>
    </div>
  );
}
