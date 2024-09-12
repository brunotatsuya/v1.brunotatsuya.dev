import Link from 'next/link'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { MdEdit, MdRemoveCircle } from 'react-icons/md'

export default function PostsTable({ postsList, setPostsList }) {

  const router = useRouter();

  const handleEditClick = (row) => {
    router.push({
      pathname: '/admin/edit-post/' + row._id,
      shallow: true
    });
  }

  const handleDeleteClick = (row) => {
    // delete from bd  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return fetch('/api/posts/' + row._id, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(response => {
            if (!response.success) {
              throw new Error(response.message);
            };
            return response;
          })
          .catch(error => {
            Swal.showValidationMessage(error.message)
          })
      }
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Post deleted',
            showConfirmButton: false,
            timer: 1500
          });
          
          // delete from datatable
          setPostsList(postsList.filter(postsList => postsList._id !== row._id));
        }
      });
  }

  const columns = [
    {
      name: 'Title',
      selector: row => ( row.isPublished ?
        <Link  legacyBehavior href={"/blog/" + row.slug} passHref>
          <a>
            <span className="fs-6 text-bold">{row.title}</span>
          </a>
        </Link> : row.title),
    },
    {
      name: 'Published',
      selector: row => row.isPublished ?
        (<span className="badge fs-6 bg-success">Yes</span>) :
        (<span className="badge fs-6 bg-warning">No</span>),
      center: true
    },
    {
      name: 'Edit',
      selector: row => (<button className="btn btn-secondary btn-sm" onClick={() => handleEditClick(row)}><MdEdit /></button>),
      center: true
    },
    {
      name: 'Delete',
      selector: row => (<button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(row)}><MdRemoveCircle /></button>),
      center: true
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={postsList}
      pagination
      responsive
    />
  )
}

