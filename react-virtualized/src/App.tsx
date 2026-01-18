import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Column,
  Grid,
  InfiniteLoader,
  List,
  Masonry,
  Table,
  TableCellDataGetterParams,
  TableCellProps,
  TableHeaderProps,
  WindowScroller,
  createMasonryCellPositioner
} from "react-virtualized";
import "react-virtualized/styles.css";
import './App.css'

const listData = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
const headerRenderer = ({ label }: TableHeaderProps) => (
  <div style={{ fontWeight: "bold" }}>{label}</div>
);

const cellDataGetter = ({ rowData, dataKey }: TableCellDataGetterParams) => rowData[dataKey];


const cellRenderer = ({ cellData }: TableCellProps) => (
  <div>{cellData}</div>
);

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>React Virtualized</h2>

      <section>
        <h3>1. Virtualized List</h3>
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              width={width}
              height={300}
              rowCount={listData.length}
              rowHeight={35}
              rowRenderer={({ key, index, style }) => (
                <div key={key} style={style}>
                  {listData[index]}
                </div>
              )}
            />
          )}
        </AutoSizer>
      </section>

      <section>
        <h3>2. Virtualized Table</h3>
        <Table
          width={600}
          height={300}
          headerHeight={40}
          rowHeight={30}
          rowCount={listData.length}
          rowGetter={({ index }) => ({
            id: index,
            name: `User ${index}`,
            email: `user${index}@mail.com`
          })}
        >
          <Column label="ID" dataKey="id" width={100} headerRenderer={headerRenderer} cellDataGetter={cellDataGetter} cellRenderer={cellRenderer} />
          <Column label="Name" dataKey="name" width={200} headerRenderer={headerRenderer} cellDataGetter={cellDataGetter} cellRenderer={cellRenderer} />
          <Column label="Email" dataKey="email" width={300} headerRenderer={headerRenderer} cellDataGetter={cellDataGetter} cellRenderer={cellRenderer} />
        </Table>
      </section>

      <section>
        <h3>3. Grid (2D)</h3>
        <Grid
          columnCount={50}
          columnWidth={100}
          height={300}
          rowCount={1000}
          rowHeight={35}
          width={600}
          cellRenderer={({ columnIndex, rowIndex, key, style }) => (
            <div key={key} style={style}>
              {rowIndex},{columnIndex}
            </div>
          )}
        />
      </section>

      <section>
        <h3>4. Infinite Loader</h3>
        <InfiniteLoader
          isRowLoaded={({ index }) => !!listData[index]}
          loadMoreRows={() =>
            new Promise((res) => setTimeout(res, 500))
          }
          rowCount={100000}
        >
          {({ onRowsRendered, registerChild }) => (
            <List
              ref={registerChild}
              width={600}
              height={300}
              rowHeight={35}
              rowCount={listData.length}
              onRowsRendered={onRowsRendered}
              rowRenderer={({ key, index, style }) => (
                <div key={key} style={style}>
                  Item {index}
                </div>
              )}
            />
          )}
        </InfiniteLoader>
      </section>

      <section>
        <h3>5. Window Scroller</h3>
        <WindowScroller>
          {({ height, isScrolling, scrollTop }) => (
            <List
              autoHeight
              height={height}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
              width={600}
              rowCount={listData.length}
              rowHeight={35}
              rowRenderer={({ key, index, style }) => (
                <div key={key} style={style}>
                  Window Item {index}
                </div>
              )}
            />
          )}
        </WindowScroller>
      </section>

      <section>
        <h3>6. Variable Height Rows (CellMeasurer)</h3>
        <CellMeasurerDemo />
      </section>

      <section>
        <h3>7. Masonry (Pinterest-style)</h3>
        <MasonryDemo />
      </section>
    </div>
  );
}


const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50
});

function CellMeasurerDemo() {
  return (
    <List
      width={600}
      height={300}
      rowCount={1000}
      deferredMeasurementCache={cache}
      rowHeight={cache.rowHeight}
      rowRenderer={({ key, index, parent, style }) => (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          rowIndex={index}
        >
          <div style={style}>
            Item {index} – {index % 5 === 0 ? "Long content ".repeat(10) : "Short"}
          </div>
        </CellMeasurer>
      )}
    />
  );
}


const masonryCache = new CellMeasurerCache({
  defaultHeight: 200,
  defaultWidth: 200,
  fixedWidth: true
});

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: masonryCache,
  columnCount: 3,
  columnWidth: 200,
  spacer: 10
});

function MasonryDemo() {
  return (
    <Masonry
      cellCount={100}
      cellMeasurerCache={masonryCache}
      cellPositioner={cellPositioner}
      cellRenderer={({ index, key, parent, style }) => (
        <CellMeasurer
          cache={masonryCache}
          index={index}
          key={key}
          parent={parent}
        >
          <div
            style={{
              ...style,
              background: "#e0e7ff",
              padding: 10
            }}
          >
            Card {index}
          </div>
        </CellMeasurer>
      )}
      height={400}
      width={640}
      autoHeight
    />
  );
}
