import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Kelulusan } from "../types/types";
import API from "../libs";

const Pengumuman: React.FC = () => {
  const [data, setData] = useState<Kelulusan[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 5;

  const getDataKelulusan = async () => {
    try {
      const response = await API.get("kelulusan");
      setData(response.data);
      setTotalItems(response.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {

    getDataKelulusan();
  }, []);

  const currentItems = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="overflow-x-auto w-[70%] mb-4">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Status Kelulusan</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[14%]">Nama Lengkap</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[10%]">NISN</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[20%]">Tempat, Tanggal Lahir</th>
              <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700 w-[22%]">Alamat</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td
                  className={`py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap ${item.statusKelulusan ? "text-green-500" : "text-red-500"}`}
                >
                  {item.statusKelulusan ? "Lulus" : "Belum Lulus"}
                </td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{item.ppdb.nama}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{item.ppdb.nisn}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{item.ppdb.ttl}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-700 whitespace-nowrap">{item.ppdb.alamat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        pageCount={Math.ceil(totalItems / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </div>
  );
}

export default Pengumuman;
