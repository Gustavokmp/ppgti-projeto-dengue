import { Component, Input, OnInit } from '@angular/core';
import { tileLayer, geoJSON, Map, Layer } from 'leaflet';
import paraibaMunicipios from '../../assets/data/geojs-25-mun.json';
import 'leaflet.heat';

@Component({
  selector: 'app-mapa-paraiba',
  templateUrl: './mapa-paraiba.component.html',
  styleUrls: ['./mapa-paraiba.component.scss'],
})
export class MapaParaibaComponent implements OnInit {

  options: any;
  layers: Layer[];
  map: Map;
  isDisplayMap = true;
  heatmapLayer: any;
  @Input() listCases: Array<any>;

  ngOnInit() {
    this.resetDoomMap();
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 9 })
      ],
      zoom: 7,
      center: [-7.1216, -36.7245] // Coordenadas aproximadas do centro da Paraíba
    };

    this.layers = [
      geoJSON((paraibaMunicipios as any).features, {
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: (e) => this.highlightFeature(e),
            mouseout: (e) => this.resetHighlight(e),
            click: (e) => this.zoomToFeature(e)
          });
          layer.bindPopup(`<p>${feature.properties.name}: ${this.getCasesByCity(feature.properties.id)} casos de dengue</p>`);
        }
      })
    ];
    this.heatmapLayer = this.createHeatmapLayer();
    this.layers.push(this.heatmapLayer);
  }
  resetDoomMap() {
    this.isDisplayMap = false;
    setTimeout(() => {
      this.isDisplayMap = true;
    }, 2000);
  }

  highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
  }

  resetHighlight(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 0.5,
      color: '#3388ff',
      dashArray: '3',
      fillOpacity: 0.2
    });
  }

  zoomToFeature(e) {
    const map: Map = e.target._map;
    map.fitBounds(e.target.getBounds());
  }

  onMapReady(map: any) {
    this.map = map;
    this.heatmapLayer = this.createHeatmapLayer();
    this.heatmapLayer.addTo(this.map);
  }

  createHeatmapLayer() {
    const heatmapData = this.generateHeatmapData((paraibaMunicipios as any).features);
    return (window as any).L.heatLayer(heatmapData, {
      radius: 10, blur: 15,
      maxZoom: 9
    });
  }

  generateHeatmapData(geojson: any) {
    const heatmapData = [];
    
    geojson.forEach((feature: any) => {
      const coordinates = feature.geometry.coordinates[0];
      const dengueCases = this.getCasesByCity(feature.properties.id);
      const centroid = this.calculateCentroid(coordinates);
      heatmapData.push([centroid[1], centroid[0], dengueCases]);
    });
    return heatmapData;
  }

  calculateCentroid(coordinates: any[]) {
    let x = 0, y = 0, n = coordinates.length;
    coordinates.forEach(coord => {
      x += coord[0];
      y += coord[1];
    });
    return [x / n, y / n];
  }

  getCasesByCity(id) {
    return this.listCases.filter((item) => item.geocode == id)[0].totalCases;
  }
}
