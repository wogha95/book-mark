<template>
  <article>
    <slot name="modal-btn">modal-btn</slot>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <slot class="modal-title" name="title">Modal Title</slot>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="body1">Modal Body1</slot>
            <slot name="input1">Modal input1</slot>
            <slot name="body2">Modal Body2</slot>
            <slot name="input2">Modal input2</slot>
          </div>
          <div class="modal-footer">
            <slot name="modal-clost-btn">Modal-clost-btn</slot>
            <slot name="modal-submit-btn">modal-submit-btn</slot>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {};
</script>

<style></style>
