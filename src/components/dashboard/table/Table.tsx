"use client";

import { Contact, User } from "@/interfaces";
import { TableItem } from "./TableItem";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FormModal } from "../modal/FormModal";
import { ConfirmModal } from "../modal/ConfirmModal";
import {
  createAdmin,
  deleteAdmin,
  editAdmin,
} from "@/actions/admins/admins.actions";
import toast from "react-hot-toast";
import { ChangePasswordModal } from "../modal/ChangePasswordModal";
import { AdminForm } from "@/infrastructure";
import { ContactViewModal } from "../modal/ContactViewModal";
import { deleteContact } from "@/actions";
import { useRouter } from "next/navigation";

interface AdminTableProps {
  name: "Administrators";
  headers: string[];
  data?: User[];
}

interface ContactTableProps {
  name: "Contacts";
  headers: string[];
  data?: Contact[];
}

type Props = AdminTableProps | ContactTableProps;

export const Table = (props: Props) => {
  const { name, headers } = props;

  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState<User[] | Contact[]>();

  const [openModal, setOpenModal] = useState({
    create: false,
    confirm: false,
    edit: false,
    changePassword: false,
    viewContact: false,
  });

  const [targetId, setTargetId] = useState("");
  const router = useRouter();

  const selectedUser =
    props.name === "Administrators"
      ? props.data?.find((user) => user.id === targetId)
      : undefined;

  const selectedContact =
    props.name === "Contacts"
      ? props.data?.find((contact) => contact.id === targetId)
      : undefined;

  useEffect(() => {
    if (props.data) {
      setDataList(props.data);
    }
  }, [props.data]);

  const findData = (value: string) => {
    if (!props.data) return;

    const q = value.toLowerCase();

    if (props.name === "Administrators") {
      const dataFounds = props.data.filter((row) => {
        const fullname = `${row.name.toLowerCase()} ${
          row.lastname?.toLowerCase() ?? ""
        }`;

        const email = row.email.toLowerCase();

        return fullname.includes(q) || email.includes(q);
      });

      setDataList(dataFounds);
      return;
    }

    if (props.name === "Contacts") {
      const dataFounds = props.data.filter((row) => {
        const fullname = `${row.name.toLowerCase()} ${
          row.lastname?.toLowerCase() ?? ""
        }`;

        const email = row.email.toLowerCase();

        return fullname.includes(q) || email.includes(q);
      });

      setDataList(dataFounds);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    findData(value);
  };

  const handleOpenModalCreate = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, create: value }));
  };

  const handleOpenModalConfirm = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, confirm: value }));
  };

  const handleOpenModalEdit = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, edit: value }));
  };

  const handleOpenModalChangePassword = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, changePassword: value }));
  };

  const handleOpenModalViewContact = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, viewContact: value }));
  };

  const handleRemove = async () => {
    if (props.name === "Contacts") {
      const remove = await deleteContact(targetId);

      setTargetId("");
      if (!remove.success) {
        toast.error(remove.message!);
        return;
      }

      router.refresh();
      toast.success(remove.message!);
      return;
    }
    try {
      const remove = await deleteAdmin(targetId);

      if (!remove.success) {
        toast.error(`${remove.error.code}`);
        return;
      }

      toast.success("The administrator has been deleted successfully");
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setTargetId("");
    }
  };

  const handleCreate = async (field: AdminForm): Promise<boolean> => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.email)) return false;

    if (!field.password) return false;

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        field.password,
      )
    ) {
      return false;
    }

    if (
      !field.name ||
      !field.lastname ||
      !field.email ||
      !field.password ||
      !field.roles
    ) {
      return false;
    }

    try {
      const response = await createAdmin(field);

      if (!response.success) {
        toast.error(`${response.error.code}`);
        return false;
      }

      toast.success("The administrator has been created successfully");
      return true;
    } catch (error) {
      toast.error(`${error}`);
      return false;
    }
  };

  const handleEdit = async (field: AdminForm): Promise<boolean> => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.email)) return false;

    if (!field.name || !field.lastname || !field.email || !field.roles) {
      return false;
    }

    try {
      const response = await editAdmin(targetId, field);

      if (!response.success) {
        toast.error(`${response.error.code}`);
        return false;
      }

      toast.success("The administrator has been edited successfully");
      return true;
    } catch (error) {
      toast.error(`${error}`);
      return false;
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5">
        <div className="flex flex-row w-full h-20 items-center justify-between bg-white border-b-2 border-gray-200">
          <span className="text-xl text-black font-bold m-10">
            {`${name} List`}
          </span>

          {name === "Administrators" && (
            <button
              className="block bg-pblue mr-10 px-5 py-2 text-white font-bold rounded-lg cursor-pointer hover:brightness-110 focus:ring-2 focus:ring-blue-300"
              type="button"
              onClick={() => handleOpenModalCreate(true)}
            >
              {`+ Add ${name.slice(0, -1)}`}
            </button>
          )}
        </div>

        <div className="px-8 py-6 bg-white">
          <div className="relative">
            <BiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 pt-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dataList?.map((value) => (
              <TableItem
                key={value.id}
                value={value}
                setOpenConfirm={handleOpenModalConfirm}
                setOpenEdit={handleOpenModalEdit}
                setOpenChangePass={handleOpenModalChangePassword}
                setTargetId={setTargetId}
                setOpenViewContact={handleOpenModalViewContact}
              />
            ))}
          </tbody>
        </table>
      </div>

      {name === "Administrators" && (
        <>
          <FormModal
            open={openModal.create}
            setOpen={handleOpenModalCreate}
            handleAction={handleCreate}
            type="create"
          />

          <FormModal
            open={openModal.edit}
            setOpen={handleOpenModalEdit}
            handleAction={handleEdit}
            type="edit"
            user={selectedUser}
          />

          <ChangePasswordModal
            id={targetId}
            open={openModal.changePassword}
            setOpen={handleOpenModalChangePassword}
          />
        </>
      )}

      {name === "Contacts" && selectedContact && (
        <ContactViewModal
          open={openModal.viewContact}
          setOpen={handleOpenModalViewContact}
          handleAction={async (): Promise<boolean> => {
            return true;
          }}
          value={selectedContact}
        />
      )}

      <ConfirmModal
        open={openModal.confirm}
        setOpen={handleOpenModalConfirm}
        handleRemove={handleRemove}
      />
    </>
  );
};
