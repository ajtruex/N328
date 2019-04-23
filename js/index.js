function createBarChart(datos) {
	var barchart = {}
	var sortOrder = false

	//el width y el height
	barchart.w = 600
	barchart.h = 400

	barchart.data = datos //los datos

	barchart.xScale = d3.scaleOrdinal() //escala x
	barchart.xScale.domain(
		d3.range(barchart.data.length) //range devuelve una lista hasta data length, [0,1,2,3,4,5]
	)
	barchart.xScale.rangeRoundBands([0, barchart.w], 0.1)

	barchart.yScale = d3.scaleLinear() //escala linear, el dominio es [valor minimo, valor maximo]
	barchart.yScale.domain([0, d3.max(barchart.data)])
	barchart.yScale.range([0, barchart.h])

	barchart.svg = d3.select("body").append("svg") //crear elemento svg dentrode body
	//atributos de svg
	barchart.svg.attr("width", barchart.w)
	barchart.svg.attr("height", barchart.h)

	barchart.svg
		.selectAll("rect") //hacer select para los rects
		.data(barchart.data) //aqui van losdatos
		.enter()
		.append("rect") //crear <rect>
		.attr("x", function(d, i) {
			//atributo <rect x=> (donde se coloca horizontalmente)
			return barchart.xScale(i)
		})
		.attr("y", function(d) {
			//y es la posicion vertocal
			return barchart.h - barchart.yScale(d)
		})
		.attr("width", barchart.xScale.rangeBand()) //width (anchos)
		.attr("height", function(d) {
			//height (alto)
			return barchart.yScale(d)
		})
		.attr("fill", function(d) {
			//color del rect
			return "rgb(0, 0, " + d * 10 + ")"
		})
		.on("mouseover", function(d) {
			//Get this bar's x/y values, then augment for the tooltip
			var xPosition =
				parseFloat(d3.select(this).attr("x")) + barchart.xScale.rangeBand() / 2
			var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + barchart.h / 2

			//Update the tooltip position and value
			d3.select("#tooltip")
				.style("left", xPosition + "px")
				.style("top", yPosition + "px")
				.select("#value")
				.text(d)

			//Show the tooltip
			d3.select("#tooltip").classed("hidden", false)
		})
		.on("mouseout", function() {
			//Remove the tooltip
			d3.select("#tooltip").classed("hidden", true)
		})
		.on("click", function(d) {
			//any bar
			sortBars()
		})

	var sortBars = function() {
		sortOrder = !sortOrder
		barchart.svg
			.selectAll("rect")
			.sort(function(a, b) {
				if (sortOrder) {
					return d3.ascending(a, b)
				} else {
					return d3.descending(a, b)
				}
			})
			.transition()
			.duration(500)
			.attr("x", function(d, i) {
				return barchart.xScale(i)
			})
	}
}

var datos = [
	10,
	20,
	30,
	20,
	50,
	40,
	90,
	80,
	30,
	50,
	30,
	40,
	70,
	30,
	70,
	30,
	20,
	30,
	20,
	30,
	20,
	30,
	070,
	30
]

createBarChart(datos)
