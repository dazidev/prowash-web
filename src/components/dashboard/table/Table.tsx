"use client";

import { Contact, PackageOrderQuote, User } from "@/interfaces";
import { TableItem } from "./TableItem";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
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
import { QuoteViewModal } from "../modal/QuoteViewModal";
import { useTableQuotes } from "./hooks/useTableQuotes";
import type { PackageOrderPurchaseStatus } from "@/interfaces";
import { appQuoteStatuses } from "../quotes/app-quote-status";

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

interface QuoteTableProps {
  name: "Quotes";
  headers: string[];
  data?: PackageOrderQuote[];
}

type Props = AdminTableProps | ContactTableProps | QuoteTableProps;

export const Table = (props: Props) => {
  const { name, headers } = props;
  const {
    open: openViewQuote,
    setOpen: setOpenViewQuote,
    handleOpen: handleOpenViewQuote,
  } = useTableQuotes();

  const [search, setSearch] = useState("");
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<
    "ALL" | PackageOrderPurchaseStatus
  >("ALL");

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

  const selectedQuote =
    props.name === "Quotes"
      ? props.data?.find((quote) => quote.id === targetId)
      : undefined;

  const filteredQuotes =
    props.name === "Quotes"
      ? (props.data ?? []).filter((quote) => {
          const matchesStatus =
            quoteStatusFilter === "ALL" ||
            quote.purchaseStatus === quoteStatusFilter;

          const searchableText = [
            quote.name,
            quote.user.name,
            quote.user.lastname,
            quote.user.email,
            quote.user.phoneNumber ?? "",
            quote.userHouse.name,
            quote.userHouse.zipcode,
          ]
            .join(" ")
            .toLowerCase();

          return (
            matchesStatus &&
            searchableText.includes(search.trim().toLowerCase())
          );
        })
      : [];

  const query = search.trim().toLowerCase();

  const filteredRecords =
    props.name === "Quotes"
      ? []
      : (props.data ?? []).filter((row) => {
          const fullname = `${row.name} ${row.lastname ?? ""}`.toLowerCase();
          const email = row.email.toLowerCase();

          return fullname.includes(query) || email.includes(query);
        });

  const visibleData =
    props.name === "Quotes" ? filteredQuotes : filteredRecords;

  const handleSearch = (value: string) => {
    setSearch(value);
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
    if (props.name === "Quotes") return;
    const remove =
      props.name === "Contacts"
        ? await deleteContact(targetId)
        : await deleteAdmin(targetId);

    setTargetId("");
    if (!remove.success) {
      toast.error(remove.message!);
      return;
    }

    router.refresh();
    toast.success(remove.message!);
    return;
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

    console.log(field);

    const response = await createAdmin(field);

    if (!response.success) {
      toast.error(`${response.message}`);
      return false;
    }

    router.refresh();
    toast.success(`${response.message}`);
    return true;
  };

  const handleEdit = async (field: AdminForm): Promise<boolean> => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.email)) return false;

    if (!field.name || !field.lastname || !field.email || !field.roles) {
      return false;
    }

    const data = {
      name: field.name,
      lastname: field.lastname,
      email: field.email,
      roles: field.roles,
    };

    const response = await editAdmin(targetId, data);

    if (!response.success) {
      toast.error(`${response.message}`);
      return false;
    }

    router.refresh();
    toast.success(`${response.message}`);
    return true;
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

        <div className="flex flex-col gap-4 bg-white px-8 py-6 lg:flex-row">
          <div className="relative flex-1">
            <BiSearch
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />

            <input
              type="text"
              aria-label="Search table records"
              placeholder={
                name === "Quotes"
                  ? "Search by package, client, email, phone or ZIP..."
                  : "Search by name or email..."
              }
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              className="
        w-full rounded-lg border border-slate-200
        py-3 pl-11 pr-4 text-sm
        outline-none transition-all
        focus:border-transparent focus:ring-2 focus:ring-blue-500
      "
            />
          </div>

          {name === "Quotes" && (
            <select
              aria-label="Filter app quotes by status"
              value={quoteStatusFilter}
              onChange={(event) =>
                setQuoteStatusFilter(
                  event.target.value as "ALL" | PackageOrderPurchaseStatus,
                )
              }
              className="
                rounded-lg border border-slate-200 bg-white
                px-4 py-3 text-sm text-black
                outline-none focus:ring-2 focus:ring-blue-500
              "
            >
              <option value="ALL">All statuses</option>

              {appQuoteStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          )}
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
            {visibleData?.map((value) => (
              <TableItem
                key={value.id}
                value={value}
                setOpenConfirm={handleOpenModalConfirm}
                setOpenEdit={handleOpenModalEdit}
                setOpenChangePass={handleOpenModalChangePassword}
                setTargetId={setTargetId}
                setOpenView={
                  name === "Contacts"
                    ? handleOpenModalViewContact
                    : handleOpenViewQuote
                }
              />
            ))}

            {name === "Quotes" && filteredQuotes.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length}
                  className="bg-white px-6 py-10 text-center text-gray-500"
                >
                  {props.data?.length
                    ? "No matching app quote requests."
                    : "No app quote requests yet."}
                </td>
              </tr>
            )}
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

      {name === "Quotes" && openViewQuote && selectedQuote && (
        <QuoteViewModal
          open={openViewQuote}
          setOpen={setOpenViewQuote}
          value={selectedQuote}
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
