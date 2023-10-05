import React from "react";

const Table = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Thumbnail</th>
          <th>Name</th>
          <th>Date</th>
          <th>Tags</th>
          <th>Link</th>
        </tr>
        {data.map((data) => (
          <tr key={data.id}>
            <td>{data.thumbnail}</td>
            <td>{data.name}</td>
            <td>{data.date}</td>
            <td>{data.tags.join(", ")}</td>
            <td>{data.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

{
  /* <td>Picture</td>
<td>Cuts and Bleeds</td>
<td>YYYY-MM-DD</td>
<td>Tag_1, Tag_2</td>
<td>URL</td> */
}
