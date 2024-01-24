import SimpleTable from "./componentes/SimpleTable";
import dayjs from 'dayjs';
import data from "../MOCK_DATA.json";

function App(){
  const columns = [//lo que se ve en el navegador
    {
      header: "ID",//lo que se muestra en pantalla
      accessorKey: 'id',//para que lea la tabla
      footer: '1era columna',
    },
    {
      header: "Name y apellido",
      accessorFn: row => `${row.name} ${row.lastname}`
    },
    //{
    //header: "Name",
    //accessorKey: 'name',
    //footer:'2da columna',
    //},
    //{
    //header: "Lastname",
    //accessorKey: 'lastname',
    //footer:'3era columna',
    //},
    {
      header: "Email",
      accessorKey: "email",
      footer: '4ta columna',
    },
    {
      header: "Country",
      accessorKey: "country",
      footer: '5ta columna',
    },
    {
      header: "DateOfBirth",
      accessorKey: "dateOfBirth",
      footer: '6ta columna',
      cell: info => dayjs(info.getValue()).format("DD/MM/YYYY"),
    },

  ];
  return (
    <div>
      <SimpleTable data={data} columns={columns}/>
    </div>
  )
}
export default App