<template>
  <div id="app">
    <table border='1'
      width='100%'
      style='border-collapse: collapse;'>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>

      <tr v-for='contact in contacts'
        :key="contact.id">
        <td>{{ contact.firstName }}</td>
        <td>{{ contact.lastName }}</td>
        <td>{{ contact.email }}</td>
        <td>
          <input type="button"
            @click="selectContact(contact)"
            value="Select">
          <input type="button"
            @click="deleteContact(contact.id)"
            value="Delete">
        </td>
      </tr>
    </table>

    </br>
    <form>
      <label>First Name</label>
      <input type="text"
        name="firstName"
        v-model="firstName">
      </br>

      <label>Last Name</label>
      <input type="text"
        name="lastName"
        v-model="lastName">
      </br>

      <label>Email</label>
      <input type="email"
        name="email"
        v-model="email">
      </br>

      <input v-if="!id"
        type="button"
        @click="createContact(firstName, lastName, email)"
        value="Add">
      <input v-if="id"
        type="button"
        @click="updateContact(id, firstName, lastName, email)"
        value="Update">
      <input type="button"
        @click="clearForm()"
        value="Clear">

    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    // 定义了四个组件变量，分别是 id、firstName、lastName 和 email。这些变量将被绑定到用于创建新联系人的 HTML Form 中
    return {
      id: null,
      firstName: "",
      lastName: "",
      email: ""
    };
  },
  apollo: {
//     gql 是一个 JavaScript 模板文字标签，它将 GraphQL 查询字符串解析到标准的 GraphQL AST 中。可以在 Github 上的官方库中找到更多详细信息：
// https://github.com/apollographql/graphql-tag

// 在这个 apollo 对象中，我们添加了一个 contacts 属性，它将保存 contacts 查询的结果。稍后，我们将使用它在模板中显示联系人。
    contacts: gql`
      query {
        contacts {
          id
          firstName
          lastName
          email
        }
      }
    `
  },
  methods: {
    // 添加 createContact()、updateContact() 和 deleteContact()
    // 使用 this.$apollo.mutate() 方法向 GraphQL Server 发送 mutation 查询，并调用 location.reload() 方法来重新加载页面。

    createContact(firstName, lastName, email) {
      console.log(`Create contact: ${email}`);
      this.$apollo.mutate({
        mutation: gql`
          mutation createContact(
            $firstName: String!
            $lastName: String!
            $email: String!
          ) {
            createContact(
              firstName: $firstName
              lastName: $lastName
              email: $email
            ) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email
        }
      });
      location.reload();
    },
    updateContact(id, firstName, lastName, email) {
      console.log(
        "id, firstName, lastName, email: ",
        id,
        firstName,
        lastName,
        email
      );
      console.log(`Update contact: # ${id}`);
      this.$apollo.mutate({
        mutation: gql`
          mutation updateContact(
            $id: ID!
            $firstName: String!
            $lastName: String!
            $email: String!
          ) {
            updateContact(
              id: $id
              firstName: $firstName
              lastName: $lastName
              email: $email
            )
          }
        `,
        variables: {
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email
        }
      });
      location.reload();
    },
    deleteContact(id) {
      console.log(`Delete contact: # ${id}`);
      this.$apollo.mutate({
        mutation: gql`
          mutation deleteContact($id: ID!) {
            deleteContact(id: $id)
          }
        `,
        variables: {
          id: id
        }
      });
      location.reload();
    },
    selectContact(contact) {
      this.id = contact.id;
      this.firstName = contact.firstName;
      this.lastName = contact.lastName;
      this.email = contact.email;
    },
    clearForm() {
      this.id = null;
      this.firstName = "";
      this.lastName = "";
      this.email = "";
    }
  }
};
</script>



<style lang="scss">
</style>
