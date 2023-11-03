import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";

registerAllModules();

function customDropdownRenderer(
  instance,
  td,
  row,
  col,
  prop,
  value,
  cellProperties
) {
  var selectedId;
  var optionsList = cellProperties.chosenOptions.data;

  if (
    typeof optionsList === "undefined" ||
    typeof optionsList.length === "undefined" ||
    !optionsList.length
  ) {
    Handsontable.cellTypes.text.renderer(
      instance,
      td,
      row,
      col,
      prop,
      value,
      cellProperties
    );
    return td;
  }

  var values = (value + "").split(",");
  value = [];
  for (var index = 0; index < optionsList.length; index++) {
    if (values.indexOf(optionsList[index].id + "") > -1) {
      selectedId = optionsList[index].id;
      value.push(optionsList[index].label);
    }
  }
  value = value.join(", ");

  Handsontable.cellTypes.text.renderer(
    instance,
    td,
    row,
    col,
    prop,
    value,
    cellProperties
  );
  return td;
}

function App() {
  const colors = [
    "yellow",
    "red",
    "orange and another color",
    "green",
    "blue",
    "gray",
    "black",
    "white",
    "purple",
    "lime",
    "olive",
    "cyan",
  ];

  function customDropdownRenderer(
    instance,
    td,
    row,
    col,
    prop,
    value,
    cellProperties
  ) {
    var selectedId;
    var optionsList = cellProperties.chosenOptions.data;

    if (
      typeof optionsList === "undefined" ||
      typeof optionsList.length === "undefined" ||
      !optionsList.length
    ) {
      // textRenderer.apply(instance, td, row, col, prop, value, cellProperties);
      return td;
    }

    var values = (value + "").split(",");
    value = [];
    for (var index = 0; index < optionsList.length; index++) {
      if (values.indexOf(optionsList[index].id + "") > -1) {
        selectedId = optionsList[index].id;
        value.push(optionsList[index].label);
      }
    }
    value = value.join(", ");

    // textRenderer.apply(instance, td, row, col, prop, value, cellProperties);
    return td;
  }

  const hotSettings = {
    data: [
      [
        "A1",
        "https://handsontable.com/docs/12.0/img/examples/professional-javascript-developers-nicholas-zakas.jpg",
        "black",
        "",
      ],
      [
        "A2",
        "https://handsontable.com/docs/12.0/img/examples/javascript-the-good-parts.jpg",
      ],
    ],
    columns: [
      {},
      {
        renderer(instance, td, row, col, prop, value, cellProperties) {
          const escaped = `${value}`;

          if (escaped.indexOf("http") === 0) {
            const img = document.createElement("IMG");
            img.src = value;

            img.addEventListener("mousedown", (event) => {
              event.preventDefault();
            });

            td.innerText = "";
            td.appendChild(img);
          } else {
            textRenderer.apply(this, arguments);
          }

          return td;
        },
      },
      {
        type: "autocomplete",
        source: colors,
        strict: false,
        visibleRows: 4,
      },
      {
        data: "cost",
        editor: "select2",
        select2Options: {
          data: [
            { id: "fixed", text: "Fixed" },
            { id: "variable", text: "Variable" },
          ],
          dropdownAutoWidth: true,
        },
      },
    ],
    colHeaders: true,
    rowHeights: 55,
    height: "auto",
    licenseKey: "non-commercial-and-evaluation",
  };

  return (
    <>
      <HotTable id="hot" settings={hotSettings} />
    </>
  );
}

export default App;
