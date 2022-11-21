// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

// TODO - Part 2
test('test isPhoneNumber', () => {
    expect(functions.isPhoneNumber('6646890033')).toBe(false);
});
test('test isPhoneNumber', () => {
    expect(functions.isPhoneNumber('911')).toBe(false);
});
test('test isPhoneNumber', () => {
    expect(functions.isPhoneNumber('(542)-300-7360')).toBe(true);
});
test('test isPhoneNumber', () => {
    expect(functions.isPhoneNumber('(312)-323-2121')).toBe(true);
});

test('test isEmail', () => {
    expect(functions.isEmail('6646890033')).toBe(false);
});
test('test isEmail', () => {
    expect(functions.isEmail('abddjdj')).toBe(false);
});
test('test isEmail', () => {
    expect(functions.isEmail('hfgj@example.com')).toBe(true);
});
test('test isEmail', () => {
    expect(functions.isEmail('example@email.com')).toBe(true);
});

test('test isStrongPassword', () => {
    expect(functions.isStrongPassword('6646890033')).toBe(false);
});
test('test isStrongPassword', () => {
    expect(functions.isStrongPassword('abcde')).toBe(true);
});
test('test isStrongPassword', () => {
    expect(functions.isStrongPassword('1aca')).toBe(false);
});
test('test isStrongPassword', () => {
    expect(functions.isStrongPassword('aeiou')).toBe(true);
});

test('test isDate', () => {
    expect(functions.isDate('6646890033')).toBe(false);
});
test('test isDate', () => {
    expect(functions.isDate('abddjdj')).toBe(false);
});
test('test isDate', () => {
    expect(functions.isDate('11/11/1111')).toBe(true);
});
test('test isDate', () => {
    expect(functions.isDate('22/22/2222')).toBe(true);
});

test('test isHexColor', () => {
    expect(functions.isHexColor('6646890033')).toBe(false);
});
test('test isHexColor', () => {
    expect(functions.isHexColor('abddjdj')).toBe(false);
});
test('test isHexColor', () => {
    expect(functions.isHexColor('#008000')).toBe(true);
});
test('test isHexColor', () => {
    expect(functions.isHexColor('#000')).toBe(true);
});


