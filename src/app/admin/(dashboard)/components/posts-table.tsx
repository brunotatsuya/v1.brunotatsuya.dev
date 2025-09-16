"use client";

import Link from "next/link";
import DataTable, { TableColumn } from "react-data-table-component";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { MdEdit, MdRemoveCircle } from "react-icons/md";

import { BlogPost } from "@/server/models/blog-posts";
import { deletePostAction } from "@/actions/posts/mutations";

type PostsTableProps = {
  posts: BlogPost[];
};

export default function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter();

  const handleEditClick = (row: BlogPost) => {
    router.push("/admin/edit-post/" + row.id);
  };

  const handleDeleteClick = (row: BlogPost) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deletePostAction(row.id);
        } catch {
          Swal.showValidationMessage("Request failed");
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Post deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const columns: TableColumn<BlogPost>[] = [
    {
      name: "Title",
      selector: (row: BlogPost) => row.title,
      cell: (row: BlogPost) =>
        row.isPublished ? (
          <Link href={"/blog/" + row.slug}>
            <span className="fs-6 text-bold">{row.title}</span>
          </Link>
        ) : (
          <span>{row.title}</span>
        ),
    },
    {
      name: "Published",
      selector: (row: BlogPost) => row.isPublished,
      cell: (row: BlogPost) => (
        <div style={{ textAlign: "center" }}>
          {row.isPublished ? (
            <span className="badge fs-6 bg-success">Yes</span>
          ) : (
            <span className="badge fs-6 bg-warning">No</span>
          )}
        </div>
      ),
    },
    {
      name: "Edit",
      selector: (row: BlogPost) => row.id,
      cell: (row: BlogPost) => (
        <div style={{ textAlign: "center" }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleEditClick(row)}
          >
            <MdEdit />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
    {
      name: "Delete",
      selector: (row: BlogPost) => row.id,
      cell: (row: BlogPost) => (
        <div style={{ textAlign: "center" }}>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteClick(row)}
          >
            <MdRemoveCircle />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return <DataTable columns={columns} data={posts} pagination responsive />;
}
