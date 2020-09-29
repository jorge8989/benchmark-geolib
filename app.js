var Benchmark = require('benchmark');
var geolib = require('geolib'); 

var suite = new Benchmark.Suite;
var markers =
  [
    { id: 2082, lat: -17.7749418, lng: -63.1892098 },
    { id: 2083, lat: -17.7750758, lng: -63.1895947 },
    { id: 1469, lat: -17.7757103, lng: -63.188971 },
    { id: 1809, lat: -17.7762927, lng: -63.1899152 },
    { id: 1829, lat: -17.7743004, lng: -63.1891855 },
    { id: 1830, lat: -17.7756899, lng: -63.1875869 },
    { id: 1828, lat: -17.7743617, lng: -63.1878659 },
    { id: 1567, lat: -17.7762211, lng: -63.1893573 },
    { id: 1613, lat: -17.7755162, lng: -63.190119 },
    { id: 1810, lat: -17.7745558, lng: -63.1892928 },
    { id: 1811, lat: -17.7747091, lng: -63.1900761 },
    { id: 1812, lat: -17.7757818, lng: -63.1905267 },
    { id: 1813, lat: -17.7754345, lng: -63.1879303 },
    { id: 1814, lat: -17.7747193, lng: -63.1907091 },
    { id: 1817, lat: -17.774893, lng: -63.1886491 },
    { id: 1818, lat: -17.7742187, lng: -63.1885418 },
    { id: 1816, lat: -17.7759964, lng: -63.1884882 },
    { id: 1827, lat: -17.7749645, lng: -63.1874904 },
    { id: 1831, lat: -17.7740859, lng: -63.1898185 },
    { id: 1832, lat: -17.7750769, lng: -63.1866643 },
    { id: 1833, lat: -17.7751076, lng: -63.190709 },
    { id: 1834, lat: -17.7737079, lng: -63.1881019 },
    { id: 1835, lat: -17.773524, lng: -63.1889388 },
    { id: 1836, lat: -17.7766093, lng: -63.1882199 },
    { id: 1819, lat: -17.7736332, lng: -63.1898293 },
    { id: 1837, lat: -17.7740654, lng: -63.190355 },
    { id: 1838, lat: -17.7743106, lng: -63.1872544 },
    { id: 1839, lat: -17.7737385, lng: -63.1872007 },
    { id: 1840, lat: -17.7762825, lng: -63.1904623 },
    { id: 1841, lat: -17.7760577, lng: -63.1873724 }
  ];

var bearing = function(x1, y1, x2, y2) {
    const y = Math.sin((Math.PI * (x2 - x1)) / 180) * Math.cos((Math.PI * y2) / 180);
    const x = (Math.cos((Math.PI * y1) / 180) * Math.sin((Math.PI * y2) / 180)) -
    (Math.sin((Math.PI * y1) / 180) * Math.cos((Math.PI * y2) / 180) *
    Math.cos((Math.PI * (x2 - x1)) / 180));

    let angleRAD = Math.atan2(y, x);    // coords to radians
    if (angleRAD < 0) {
    angleRAD += (2 * Math.PI);
    }
    return angleRAD * (180.0 / Math.PI); // rad to degree
};

suite.add('isPointInCircle#test', function() {
  markers.forEach((marker) => { 
    geolib.isPointInCircle(
        { latitude: marker.lat, longitude: marker.lng },
        { latitude: -17.77503, longitude: -63.1900475 },
        30
      );
  });
})

suite.add('getDistance#test', function() {
  var markersWithDistance = markers.map((marker) => { 
    var distance = geolib.getDistance(
      { latitude: marker.lat, longitude: marker.lng },
      { latitude: -17.77503, longitude: -63.1900475 }
    );
    return {
      id: marker.id,
      latitude: marker.lat,
      longitude: marker.lng,
      distance
    }
  });
  markersWithDistance.reduce((a, b) => a.distance < b.distance ? a : b);
})

suite.add('orderByDistance#test', function() {
  var markersObject = {};
  markers.forEach((marker) => {
    if (!marker.completed) {
      markersObject[marker.id] = { latitude: marker.lat, longitude: marker.lng };
    }
  });
  geolib.orderByDistance({
      latitude: -17.77503, longitude: -63.1900475,
    }, markersObject)[0];
})

suite.add('bearing#test', function() {
  bearing(-63.1911575, -17.7766401, -63.1894945, -17.7751893);
})

.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Done');
})

.run({ 'async': true });