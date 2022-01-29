import Link from 'next/link'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import { MdEdit, MdRemoveCircle } from 'react-icons/md'
import { useState } from 'react'

export default function PostsTable({ posts }) {

  const [postsList, setPostsList] = useState(posts);

  const handleEditClick = (row) => {
    setPostsList(postsList.filter(post => post.slug !== row.slug));
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
        return fetch('/api/delete-blog-post-by-slug', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug: row.slug }),
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
          setPostsList(postsList.filter(post => post.slug !== row.slug));
        }
      });
  }

  const columns = [
    {
      name: 'Title',
      selector: row => (
        <Link href={"/blog/" + row.slug} passHref>
          <a>
            <span className="fs-6 text-bold">{row.title}</span>
          </a>
        </Link>),
      width: '68%'
    },
    {
      name: 'Published',
      selector: row => row.isPublished ?
        (<span className="badge fs-6 bg-success">Yes</span>) :
        (<span className="badge fs-6 bg-warning">No</span>),
      width: '12%',
      center: true
    },
    {
      name: 'Edit',
      selector: row => (<button className="btn btn-secondary btn-sm" onClick={() => handleEditClick(row)}><MdEdit /></button>),
      width: '10%',
      center: true
    },
    {
      name: 'Delete',
      selector: row => (<button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(row)}><MdRemoveCircle /></button>),
      width: '10%',
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

