const get_bits_system_architecture = () => 
{
    let _64bits_signatures = ['x86_64', 'x86-64', 'Win64', 'x64;', 'amd64', 'AMD64', 'WOW64', 'x64_64', 'ia64', 'sparc64', 'ppc64', 'IRIX64'];
    let _bits = 32, _i, _c;
    let _to_check = [];

    if (window.navigator.cpuClass)
        _to_check.push((window.navigator.cpuClass + '').toLowerCase());
    if (window.navigator.platform)
        _to_check.push((window.navigator.platform + '').toLowerCase());
    if (navigator.userAgent)
        _to_check.push((navigator.userAgent + '').toLowerCase());

    outer_loop:
    for (_c = 0; _c < _to_check.length; _c++)
    {
        for (_i = 0; _i < _64bits_signatures.length; _i++)
        {
            if (_to_check[_c].indexOf(_64bits_signatures[_i].toLowerCase()) !== -1)
            {
               _bits = 64;
               break outer_loop;
            }
        }
    }

    return _bits;
};

const is_32bits_architecture = () => 
{
    return get_bits_system_architecture() === 32 ? 1 : 0;
};

const is_64bits_architecture = () => 
{
    return get_bits_system_architecture() === 64 ? 1 : 0;
};

const get_os = () => 
{
    // 'Linux' must be before 'X11', because both Linux et Unix systems have 'X11'

    let os_name = 'unknown';

    if (navigator.appVersion.indexOf('Win') !== -1)
        os_name = 'win';
    else if (navigator.appVersion.indexOf('Mac') !== -1)
        os_name = 'mac';
    else if (navigator.appVersion.indexOf('Linux') !== -1)
        os_name = 'linux';
    else if (navigator.appVersion.indexOf('X11') !== -1)
        os_name = 'unix';

    if (os_name === 'win')
        return is_64bits_architecture() ? 'win64' : 'win32';
    else
        return os_name;
};

export
{
    get_bits_system_architecture,
    is_32bits_architecture,
    is_64bits_architecture,
    get_os
};

