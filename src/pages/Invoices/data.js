<div className="flex justify-between items-center flex-wrap">
{auth ? (
  <>
    {auth.user.role === "admin" ? (
      <div className="flex items-center flex-wrap">
        <TableButton title={t("download")} onclick={handleExport} />

        <div className="flex items-center border px-3 py-2 mx-10 rounded-full">
          <label htmlFor="excel" className="mx-3">
            {t("selectexcel")}
            <input
              id="excel"
              type="file"
              className="hidden"
              onChange={onFileChange}
            />
          </label>

          <TableButton title={t("Upload")} onclick={onUpload} />
        </div>

        {branches && branches.length > 0 ? (
          <CustomSelect
            title={t("branch")}
            value={selectedOption}
            data={branches}
            itemTitleKey="id"
            itemtitle="name"
            itemvalue="id"
            onchange={handleBranchChange}
          />
        ) : (
          <></>
        )}

        {methodTypes && methodTypes.length > 0 ? (
          <>
            <CustomSelect
              title={t("selectpaidmethod")}
              value={selectedOption}
              data={methodTypes}
              itemTitleKey="id"
              itemtitle="method"
              itemvalue="method"
              onchange={handleMethodChange}
            />
          </>
        ) : (
          <></>
        )}

        <div>
          <h3 className="bg-light px-4 py-2 rounded-full mx-4">
            {totalPrice.toFixed(2)}
          </h3>
        </div>
      </div>
    ) : (
      <></>
    )}
  </>
) : (
  <></>
)}

<TableSearchBox onchange={handleFilter} />
</div>