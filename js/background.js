function showError(errId, errMsg) {
    alert('An error occured: ' + errId + ', ' + errMsg)
}

function patchInitialized() {}

function patchFinishedLoading() {}
document.addEventListener('DOMContentLoaded', function (event) {
    CABLES.patch = new CABLES.Patch({
        patch: CABLES.exportedPatch,
        prefixAssetPath: '',
        glCanvasId: 'glcanvas',
        glCanvasResizeToWindow: true,
        onError: showError,
        onPatchLoaded: patchInitialized,
        onFinishedLoading: patchFinishedLoading,
    })
});