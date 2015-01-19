module.exports = function (grunt) {
    grunt.initConfig({
        nodewebkit: {
            options: {
                build_dir: './build',
				mac_icns: 'icon.icns', // Path to the Mac icon file
                // specifiy what to build
                mac: true,
                win: true,
                linux32: false,
                linux64: true
            },
            src: './src/**/*'
        },
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.registerTask('default', ['nodewebkit']);
};
