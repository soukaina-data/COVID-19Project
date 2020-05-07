data = d3.csvParse(await FileAttachment("Data.csv").text(), d3.autoType)

chart = {
    replay;
  
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);
  
    const updateBars = bars(svg);
    const updateAxis = axis(svg);
    const updateLabels = labels(svg);
    const updateTicker = ticker(svg);
  
    yield svg.node();
  
    for (const keyframe of keyframes) {
      const transition = svg.transition()
          .duration(duration)
          .ease(d3.easeLinear);
  
      // Extract the top bar’s value.
      x.domain([0, keyframe[1][0].value]);
  
      updateAxis(keyframe, transition);
      updateBars(keyframe, transition);
      updateLabels(keyframe, transition);
      updateTicker(keyframe, transition);
  
      invalidation.then(() => svg.interrupt());
      await transition.end();
    }
  }

  duration = 250

  n = 12

  names = new Set(data.map(d => d.country))

  datevalues = Array.from(d3.rollup(data, ([d]) => d.value, d => +d.date, d => d.country))
  .map(([date, data]) => [new Date(date), data])
  .sort(([a], [b]) => d3.ascending(a, b))

  function rank(value) {
    const data = Array.from(names, name => ({name, value: value(name)}));
    data.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
    return data;
  }

  rank(name => datevalues[0][1].get(name))

  k = 10

  keyframes = {
    const keyframes = [];
    let ka, a, kb, b;
    for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
      for (let i = 0; i < k; ++i) {
        const t = i / k;
        keyframes.push([
          new Date(ka * (1 - t) + kb * t),
          rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
        ]);
      }
    }
    keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
    return keyframes;
  }
