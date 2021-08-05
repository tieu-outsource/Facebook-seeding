<template>
  <v-card elevation="2" shaped tile>
    <v-card-header>
      <v-card-header-text>
        <v-card-title class="page-title">Hello viet nam</v-card-title>
      </v-card-header-text>

      <v-card-actions>
        <button-icon @click="showCreate = !showCreate" label="Create" color="green" icon="mdi-plus-circle" />
        <button-icon label="Delete" color="red" icon="mdi-minus-circle" />
        <button-select />
      </v-card-actions>
    </v-card-header>

    <table-lite
      :has-checkbox="true"
      :is-loading="table.isLoading"
      :is-re-search="table.isReSearch"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      :messages="table.messages"
      @do-search="doSearch"
      @is-finished="tableLoadingFinish"
      @return-checked-rows="updateCheckedRows"
    ></table-lite>
  </v-card>

  <form-dialog v-model:visible="showCreate" />
</template>
<script>
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import ButtonSelect from "@/components/buttons/ButtonSelect.vue";
import TableLite from "vue3-table-lite";
import FormDialog from "@/components/dialogs/FormDialog.vue";
import { reactive, ref } from "vue";

function useCreate() {
  const showCreate = ref(false);

  return { showCreate }
}

export default {
  components: { ButtonIcon, ButtonSelect, TableLite, FormDialog },
  setup() {
    const table = reactive({
      isLoading: false,
      isReSearch: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
          display: function (row) {
            return (
              '<a href="#" data-id="' +
              row.user_id +
              '" class="is-rows-el name-btn">' +
              row.name +
              "</button>"
            );
          },
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
        {
          label: "",
          field: "quick",
          width: "10%",
          display: function (row) {
            return (
              '<button type="button" data-id="' +
              row.user_id +
              '" class="is-rows-el quick-btn">Button</button>'
            );
          },
        },
      ],
      rows: [
        {
          id: 1,
          name: "TEST1",
        },
        {
          id: 2,
          name: "TEST2",
        },
      ],
      totalRecordCount: 2,
      sortable: {
        order: "id",
        sort: "asc",
      },
      messages: {
        pagingInfo: "Showing {0}-{1} of {2}",
        pageSizeChangeLabel: "Row count:",
        gotoPageLabel: "Go to page:",
        noDataAvailable: "No data",
      },
    });

    return {
      table,
      ...useCreate()
    };
  },
};
</script>

<style></style>
