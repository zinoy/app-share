function getOrientation(result) {
  var view = new DataView(result);
  if (view.getUint16(0, false) != 65496) {
    return -2
  }
  var length = view.byteLength,
    offset = 2;
  while (offset < length) {
    var marker = view.getUint16(offset, false);
    offset += 2;
    if (marker == 65505) {
      if (view.getUint32(offset += 2, false) != 1165519206) {
        return -1
      }
      var little = view.getUint16(offset += 6, false) == 18761;
      offset += view.getUint32(offset + 4, little);
      var tags = view.getUint16(offset, little);
      offset += 2;
      for (var i = 0; i < tags; i++) {
        if (view.getUint16(offset + (i * 12), little) == 274) {
          return view.getUint16(offset + (i * 12) + 8, little)
        }
      }
    } else {
      if ((marker & 65280) != 65280) {
        break
      } else {
        offset += view.getUint16(offset, false)
      }
    }
  }
  return -1
};
