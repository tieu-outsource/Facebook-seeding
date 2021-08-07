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

  <form-dialog :title="t('message.hello')" v-model:visible="showCreate">
    <template #body>
      <v-radio class="mb-5" v-model="createMethod" :options="createMethodOptions" :label="t('account.loginMethod')"/>

      <div>
        <div v-if="createMethod == 'cookie'">
          <textarea class="textarea" placeholder="e.g. Hello world" v-model="account.cookie"></textarea>
        </div>
        <div v-else>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"> {{ t('account.username') }} </label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" placeholder="Email,Phone" v-model="account.username">
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"> {{ t('account.password') }} </label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" v-model="account.password">
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"> {{ t('account.twoFaCode') }} </label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" v-model="account.twoFaCode">
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="is-flex is-justify-content-center mt-4">
        <v-btn
          rounded="pill"
          color="blue"
          text-color="white"
          @click="create"
        >
          {{ t('message.submit') }}
        </v-btn>
      </div>

    </template>
  </form-dialog>
</template>
<script>

import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import ButtonSelect from "@/components/buttons/ButtonSelect.vue";
import VRadio from "@/components/inputs/VRadio.vue";
import TableLite from "vue3-table-lite";
import FormDialog from "@/components/dialogs/FormDialog.vue";
import { reactive, ref, onMounted } from "vue";
import accountStore from "@/db/stores/account";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";

function useCreate(table) {
  const showCreate = ref(false);
  const createMethod = ref("cookie");
  const createMethodOptions = ["cookie", "password"];
  const toast = useToast();

  const account = reactive({
    cookie: '',
    username: '',
    password: '',
    twoFaCode: '',
  })

  async function create() {
    try {
      const res = await accountStore.create(account);
      table.rows.push(res);
      showCreate.value = false;
      toast.success("account.created");
    } catch (e) {
      toast.error();
    }
  }

  return { showCreate, createMethod, createMethodOptions, account, create }
}

export default {
  components: { ButtonIcon, ButtonSelect, TableLite, FormDialog, VRadio },
  setup() {
    const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning
    const table = reactive({
      isLoading: false,
      isReSearch: false,
      columns: [
        {
          label: t('account.username'),
          field: "username",
          sortable: true,
          isKey: true,
        },
        {
          label: t('account.friendCount'),
          sortable: true,
        },
        {
          label: t('account.groupCount'),
          sortable: true,
        },
        {
          label: t('account.status'),
          sortable: true,
        },
      ],
      rows: [],
      totalRecordCount: 0,
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

    onMounted( async () => {
      table.rows = await accountStore.readAll();
      console.log('hehe',table.rows);
    });

    return {
      table,
      t,
      ...useCreate(table)
    };
  },
};
</script>

<style></style>
