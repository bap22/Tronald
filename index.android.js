/**
 * BP Sample App
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';

//var REQUEST_URL = 'http://www.brett-peterson.com/wp-json/wp/v2/posts?filter[cat]=4&filter[orderby]=rand&filter[per_page]=1';
//https://market.mashape.com/matchilling/tronald-dump#random-quote
var REQUEST_URL = 'https://matchilling-tronald-dump-v1.p.mashape.com/random/quote';

var MOCKED_DATA = [
  {title: 'BP', content: "Tronald Dump"},
];

var BP = React.createClass({
  getInitialState: function() {
    return {
      randomPost: MOCKED_DATA[0],
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
      fetch(REQUEST_URL,{
        method:'get',
        headers:{
          'X-Mashape-Key':'cAjEf57cASmsh5J6EkRziCNY1No6p15h1d2jsnWmc8ZaQ03wCT',
          'Accept': 'application/hal+json'
        }
      })
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({
              //randomPost: { title: responseData[0].title.rendered, content:responseData[0].content.plaintext },
              randomPost: { title: "... on "+responseData.tags[0], content:responseData.value },
          });
      })
      .done();
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/tronalddump.png')} style={styles.mainimg} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {this.state.randomPost.title}
          </Text>
          <Text style={styles.text}>
            {this.state.randomPost.content}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#ccc'
            onPress={this.fetchData}
          >
            <Text style={styles.buttonText}>See another Tronald Dumpism &raquo;</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var styles = StyleSheet.create({
  mainimg: {
    width: 100,
    height: 100,
    top:100
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer: {
    bottom: 0,
    flex: .1,
    width: windowSize.width,
    backgroundColor: '#eee',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#666666',
    fontStyle: 'italic'
  },
});

AppRegistry.registerComponent('BP', () => BP);